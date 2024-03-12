import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      userInfo: null,
    };
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  }
});

export default useStore;
