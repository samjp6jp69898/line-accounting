<template>
    <div class="flex item-center justify-between px-3 mt-3" v-if="!isLogin">
        <!-- <button class="theme-btn" @click="toggleTheme">切換主題</button>
        <div v-if="isLogin">
            <img :src="avatar" alt="" class="w-10 h-10 rounded-full" />
            <span class="name">{{ name }}</span>
        </div> -->
        <el-skeleton :rows="0" animated />
        <el-skeleton animated style="--el-skeleton-circle-size: 30px; width: 30px;">
            <template #template>
                <el-skeleton-item variant="circle" />
            </template>
        </el-skeleton>
    </div>
    <div class="scroll_flex_container" style="overflow: hidden;" v-else>
        <Navbar />
        <PersonalBalance v-if="showPersonalBalance" />
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import Navbar from '../components/Navbar.vue';
import PersonalBalance from '../components/PersonalBalance.vue';
import DataMo from '../models/dataModel.model'
export default {
    components: {
        Navbar,
        PersonalBalance
    },
    computed: {
        ...mapState('user', {
            name: 'name',
            avatar: 'avatar',
            isLogin: 'isLogin',
        }),
        ...mapState('basic', {
            liffInitStatus: 'liffInitStatus',
            currentPage: 'currentPage',
        }),
        showPersonalBalance() {
            return this.currentPage === DataMo.Page.Personal;
        },
        showGroupBalance() {
            return this.currentPage === DataMo.Page.Group;
        },
    },
    data() {
        return {
        }
    },
    async created() {
    },
    methods: {
        toggleTheme() {
            this.$store.dispatch('basic/toggleTheme');
        },
    },
}
</script>
<style>
.theme-btn {
    background-color: var(--button-bg-color);
    padding: 4px 8px;
    border-radius: 4px;
    margin-top: 20px;
}

.name {
    color: var(--text-color);
}
</style>