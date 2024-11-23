<template>
    <div class="scroll_flex_container" v-if="liffInitStatus">
        <button class="theme-btn" @click="toggleTheme">切換主題</button>
        <div v-if="isLogin">
            <img :src="avatar" alt="" class="w-10 h-10 rounded-full" />
            <span class="name">{{ name }}</span>
        </div>
    </div>
    <div class="scroll_flex_container" v-else>
        <Navbar />
        <PersonalBalance v-if="showPersonalBalance" />
        <!-- <button class="theme-btn" @click="toggleTheme">切換主題</button>
        <el-skeleton :rows="0" animated />
        <el-skeleton animated style="--el-skeleton-circle-size: 30px">
            <template #template>
                <el-skeleton-item variant="circle" />
            </template>
        </el-skeleton> -->
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