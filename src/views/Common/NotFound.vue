<script setup>
import BasicLayoutFooter from '@/components/layout/BasicLayoutFooter.vue';
</script>
<template>
    <div class="notfound-page">
        <div class="page-mainer">
            <div class='mainer-content'>
                <div class="content-img">
                    <svg-icon name="error-404" width="252" height="294"></svg-icon>
                </div>
                <div class="content-title">404</div>
                <div class="content-subtitle">Sorry, the page you visited does not exist.</div>
                <div class="content-btn-box">
                    <a href="/">
                        <button type="button" class="content-btn">
                            <span>Back to home</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
        <BasicLayoutFooter />
    </div>
</template>
<style lang="less" scoped>
.notfound-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.page-mainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    background-color: transparent;
    position: relative;
    padding-block: 32px;
    padding-inline: 40px;
}

.mainer-content {
    padding: 48px 32px;

    .content-img {
        width: 250px;
        height: 295px;
        margin: auto;
        margin-bottom: 24px;
        text-align: center;
    }

    .content-title {
        color: rgba(0, 0, 0, 0.88);
        font-size: 24px;
        line-height: 1.3333333333333333;
        margin-block: 8px;
        text-align: center;
    }

    .content-subtitle {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 1.5714285714285714;
        text-align: center;
    }

    .content-btn-box {
        margin: 24px 0 0 0;
        text-align: center;
    }

    .content-btn {
        color: #fff;
        background: #1890ff;
        box-shadow: 0 2px 0 rgba(5, 175, 255, 0.1);
        font-size: 14px;
        height: 32px;
        padding: 4px 15px;
        border-radius: 6px;
        outline: none;
        border: 1px solid transparent;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        user-select: none;

        &:hover {
            color: #fff;
            background: #40a9ff;
        }
    }
}
</style>