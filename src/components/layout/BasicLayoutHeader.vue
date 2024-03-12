<script setup>
import { computed } from 'vue'
import { useStore } from '@/stores/index.js'
const store = useStore()
const userInfo = computed(() => store.userInfo)

function handleNavToLogin() {
    console.log('handleNavToLoagin')
}

function handleCommand(command) {
    console.log(command)
}
</script>
<template>
    <header class="page-header">
        <div class="header-content container-1080">
            <div class="header-hd">
                <router-link :to="{ name: 'Home' }">
                    <img class="header-logo" src="" />
                </router-link>
                <nav class="header-nav">
                    <router-link :to="{ name: 'Home' }" class="header-nav-item">首页</router-link>
                    <router-link :to="{ name: 'Academy' }" class="header-nav-item">学社</router-link>
                </nav>
            </div>
            <div class="header-ft">
                <div class="bar-info-container" v-if="!userInfo?.id" @click="handleNavToLogin">
                    <span class="header-loginandregister">登录</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="header-loginandregister">注册</span>
                </div>
                <el-dropdown style="height: 100%" @command="handleCommand" v-if="userInfo?.id">
                    <div class="bar-info-container">
                        <i v-if="!userInfo?.avatar_url" class="el-icon-user-solid userInfo-avatar"></i>
                        <img v-else class="userInfo-avatar" :src="userInfo.avatar_url" />
                        <span class="userInfo-name">{{ userInfo.nickname }}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item icon="el-icon-user" command="GoMy">个人设置</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-setting" command="GoSetting">账号安全</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-video-pause" command="Logout" divided>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </header>
</template>

<style type="text/css" lang="less" scoped>
.page-header {
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;

        .header-hd,
        .header-bd,
        .header-ft {
            display: flex;
            align-items: center;
            height: 100%;
        }

        .header-logo {
            height: 40px;
            min-width: 40px;
            margin-right: 40px;
            vertical-align: middle;
        }

        .header-nav {
            display: inline-block;

            .header-nav-item {
                position: relative;
                font-size: 14px;
                line-height: 40px;
                color: #666;
                margin-right: 32px;
                text-decoration: none;

                &.router-link-exact-active {
                    color: #35b558;

                    &:after {
                        position: absolute;
                        content: '';
                        width: 110%;
                        height: 4px;
                        background: #35b558;
                        bottom: -8px;
                        left: 50%;
                        transform: translateX(-50%);
                        border-radius: 2px;
                    }
                }
            }
        }

        .page-header-right {
            height: 100%;
        }

        .bar-info-container {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 20px;
            transition: all 0.2s ease;
            cursor: pointer;

            &:hover {
                background-color: #ecf5ff;
            }

            .userInfo-name {
                font-size: 14px;
                vertical-align: middle;
            }

            .userInfo-avatar {
                display: inline-block;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                background-color: #ccc;
                border-radius: 50%;
                outline: none;
                margin: 0 10px;
            }
        }
    }

    .header-loginandregister {
        color: #666;
    }
}
</style>
