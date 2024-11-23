<template>
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect"
        :unique-opened="true" :close-on-click-outside="true" :ellipsis="false" menu-trigger="click">
        <el-menu-item :index="personalIndex">個人</el-menu-item>
        <el-menu-item :index="groupIndex">群組</el-menu-item>
        <el-sub-menu index="2" @close="handleClose">
            <template #title>
                <img style="width: 20px" src="../assets/vue.svg" />
            </template>
            <el-menu-item :index="subMenuPersonalIndex">個人</el-menu-item>
            <el-menu-item :index="subMenuGroupIndex">群組</el-menu-item>
            <el-menu-item :index="personalProfileIndex">個人檔案</el-menu-item>
            <el-menu-item :index="myPaymentsIndex">我的收款</el-menu-item>
            <!-- <el-menu-item index="2-3">登出</el-menu-item> -->
        </el-sub-menu>
    </el-menu>
</template>
<script>
import { mapState } from 'vuex';
import defaultAvatar from '../assets/vue.svg';
import DataMo from '../models/dataModel.model'  
export default {
    computed: {
        ...mapState('user', {
            name: 'name',
            avatar: 'avatar',
            isLogin: 'isLogin',
        }),
        ...mapState('basic', {
            currentPage: 'currentPage',
        }),
        displayAvatar() {
            return this.avatar ? this.avatar : defaultAvatar;
        }
    },
    data() {
        return {
            activeIndex: DataMo.Page.personal,
            personalIndex: DataMo.Page.Personal,
            groupIndex: DataMo.Page.Group,
            personalProfileIndex: DataMo.Page.PersonalProfile,
            myPaymentsIndex: DataMo.Page.MyPayments,
            subMenuPersonalIndex: DataMo.Page.SubPersonal,
            subMenuGroupIndex: DataMo.Page.SubGroup,
        };
    },
    mounted() {
        this.activeIndex = this.currentPage;
    },
    methods: {
        handleSelect(index) {
            if (index === this.subMenuPersonalIndex) {
                this.$store.commit('basic/setCurrentPage', this.personalIndex);
            } else if (index === this.subMenuGroupIndex) {
                this.$store.commit('basic/setCurrentPage', this.groupIndex);
            } else {
                this.$store.commit('basic/setCurrentPage', index);
            }
            this.activeIndex = this.currentPage
        },
        handleClose(key, keyPath) {
            // useless but without it the console will show a warning
        },
    }
}
</script>
<style>
.el-menu {
    width: 100%;
}

.el-menu--horizontal>.el-menu-item:nth-child(1),
.el-menu--horizontal>.el-menu-item:nth-child(2) {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 1;
}

.el-menu--horizontal>.el-menu-item:nth-child(3) {
    margin-right: auto;
}
</style>