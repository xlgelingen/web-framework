import request from '@/utils/request.js';
import API from '@/consts/api.js';

const ossService = {
  /**
   * 上传单个文件
   */
  upload: async (
    { file, title = null, bucket = null, space = null, folder = null },
    callback, //上传成功后的回调函数。
    error, //上传失败时的回调函数。
    end, //上传结束时的回调函数。
    storecallback //存储上传回调信息后的回调函数。
  ) => {
    /* ossService.token 方法返回的是一个 Promise 对象，
    通过 await 关键字等待异步操作的完成，
    可以得到该 Promise 对象的解决（resolved）值，也就是获取到的 OSS 临时访问凭证。 */
    const ossParams = await ossService
      .token({
        file_name: file.name,
        bucket,
        space,
        folder
      })
      .catch((err) => {
        console.log(err);
        /* 逻辑与操作符 && 的运算规则是：如果第一个操作数为真，则返回第二个操作数；
        如果第一个操作数为假，则直接返回第一个操作数，不再继续执行后面的操作。 
        这句话是如果 end 回调函数存在且为真（即不为 null 或 undefined），则调用 end() 函数。
        否则不执行任何操作
        相当于if (end) {end();}*/
        end && end();
      });

    const uploadRes = await ossService.put(file, ossParams).catch((err) => error && error(err));
    callback(uploadRes);
    //？？？这里不会直接结束upload方法吗？
    end && end();

    const storeRes = await ossService
      .storeCallback({
        file_name: space,
        path: ossParams.key,
        bucket: ossParams.bucket,
        title
      })
      .catch((err) => error && error(err));
    storecallback && storecallback(storeRes);
  },
  /**
   *  获取token授权
   *  'file_name' => 'required|string', // 文件名
      'bucket' => 'string', // bucket名
      'space' => 'string', // 空间名，例如avatar
      'folder' => 'string' // 文件夹名
   */
  token: (params = {}) => {
    return request.post(API.ossToken, params);
  },

  put: (file, params) => {
    const { region, accessKeyId, accessKeySecret, stsToken, bucket, key } = params;

    /* 使用阿里云 OSS（对象存储服务）时创建 OSS 客户端的方式，
    可以通过该客户端对象进行文件上传、下载、删除等操作。 */
    // eslint-disable-next-line
    const client = new OSS({
      region,
      accessKeyId,
      accessKeySecret,
      stsToken,
      bucket,
      timeout: 1800000
    });
    //通过该客户端对象进行文件上传client.put（文件标识符，要上传的文件内容）
    return client.put(key, file);
  },

  /**
   *  上传成功后回调
   *  'file_name' => 'required|string', // 文件类型，例如avatar
      'path'      => 'required|string', // token返回的bucket存储位置
      'bucket'    => 'required|string', // bucket名
      'title'      => 'string' // 文件展示名称
   */
  storeCallback: (params) => {
    return request.post(API.ossStore, params);
  }
};

export default ossService;
