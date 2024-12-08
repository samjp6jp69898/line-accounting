<template>
    <div class="w-full flex flex-col items-center justify-start grow overflow-y-auto scroll-content">
        <div class="w-full flex items-center justify-center px-6 my-4 relative ">
            <div class="flex items-center justify-around bg-[#ffffff1a] rounded-xl w-[90%] h-12 px-2 font-bold">
                <el-date-picker :editable="false" :clearable="false" :format="dayFormat" :value-format="dayFormat"
                    v-if="currentRageDay" v-model="timeValue" type="date" placeholder="選擇日" ref="timePicker"
                    @change="change" />
                <el-date-picker :editable="false" :clearable="false" :format="monthFormat" :value-format="monthFormat"
                    v-if="currentRageMonth" v-model="timeValue" type="month" placeholder="選擇月份" ref="timePicker"
                    @change="change" />
                <el-date-picker :editable="false" :clearable="false" :format="yearFormat" :value-format="yearFormat"
                    v-if="currentRageYear" v-model="timeValue" type="year" placeholder="選擇年份" ref="timePicker"
                    @change="change" />

                <button class="text-white text-sm absolute right-14 size-8 rounded-full bg-[#4a4a4a] custom-shadow"
                    @click.stop="toggleRangePicker" circle plain>
                    {{ currentRange }}
                </button>
            </div>
        </div>
        <div class="w-full flex items-center justify-around px-6">
            <div class="flex flex-col items-start justify-between grow mr-6 h-full">
                <el-statistic :value="displayIncome" style="background: var(--secondary-background-color);"
                    class="w-full py-3 rounded-xl flex flex-col items-center justify-center" prefix="$">
                    <template #title>
                        <div class="text-lg font-semibold fontMono text-[#ffffff80]">{{ currentRange }}收入</div>
                    </template>
                </el-statistic>
                <el-statistic :value="displayExpense" style="background: var(--secondary-background-color);"
                    class="w-full py-3 rounded-xl flex flex-col items-center justify-center content" prefix="$">
                    <template #title>
                        <div class="text-lg text-[#ffffff80] font-semibold fontMono">{{ currentRange }}支出</div>
                    </template>
                </el-statistic>
            </div>
            <div style="background: var( --secondary-background-color);"
                class="px-1.5 rounded-xl h-48 flex items-center justify-center">
                <el-progress :stroke-width="12" stroke-linecap="square" type="circle" :indeterminate="true"
                    :duration="10" :percentage="progressPercentage" :width="130" color="var(--primary-color)">
                    <template #default>
                        <el-statistic :value="displayBalance">
                            <template #title>
                                <div class="text-white text-base fontMono">餘額</div>
                            </template>
                        </el-statistic>
                    </template>
                </el-progress>
            </div>
        </div>
        <div class="w-full grow mb-14 mt-3 px-6">
            <CategoryBlock v-for="(item, index) in categories" :key="index" :categoryName="item" />
        </div>
        <div class="absolute bottom-4 flex w-full items-center justify-center">
            <el-button type="primary" circle size="default" text bg>
                <template #icon>
                    <el-icon size="42" color="var(--primary-color)">
                        <CirclePlusFilled />
                    </el-icon>
                </template>
            </el-button>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex';
import CategoryBlock from './CategoryBlock.vue';
export default {
    components: {
        CategoryBlock
    },
    data() {
        return {
            currentRange: '月',
            timeValue: '',
            yearFormat: 'YYYY年',
            monthFormat: 'YYYY年MM月',
            dayFormat: 'YYYY年MM月DD日',
            displayBalance: 0,
            displayIncome: 0,
            displayExpense: 0,
            expense: 24000,
            income: 76543,
            progressPercentage: 0
        }
    },
    mounted() {
        const today = new Date();
        this.timeValue = `${today.getFullYear()}年${today.getMonth() + 1}月}`;
        this.startAnimation()
    },
    watch: {
        currentRange(val) {
            this.$refs.timePicker.blur();
            const today = new Date();
            if (val === '日') {
                // if today.getDate() < 10, add 0 before the date
                this.timeValue = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}日`;
            } else if (val === '月') {
                this.timeValue = `${new Date().getFullYear()}年${new Date().getMonth() + 1}月`;
            } else {
                this.timeValue = `${new Date().getFullYear()}年`;
            }
        }
    },
    computed: {
        currentRageDay() {
            return this.currentRange === '日';
        },
        currentRageMonth() {
            return this.currentRange === '月';
        },
        currentRageYear() {
            return this.currentRange === '年';
        },
        ...mapState('category', {
            categories: 'categories'
        })
    },
    methods: {
        startAnimation() {
            const duration = 800;
            const startTime = performance.now();
            const balance = this.income - this.expense;
            this.progressPercentage = balance <= 0 ? 0 : Math.floor((this.expense / this.income) * 100);

            const animate = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                this.displayBalance = Math.floor(balance * progress);
                this.displayIncome = Math.floor(this.income * progress);
                this.displayExpense = Math.floor(this.expense * progress);
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        },
        toggleRangePicker() {
            // 根據當前狀態切換到下一個選項
            if (this.currentRange === '月') {
                this.currentRange = '年';
            } else if (this.currentRange === '年') {
                this.currentRange = '日';
            } else {
                this.currentRange = '月';
            }
        },
        change(e) {
            console.log(e);
            this.$refs.timePicker.blur();
        },
    }
}
</script>
<style lang="css">
.content span {
    color: #e8ab51 !important;
}

.scroll-content {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.scroll_flex_container::-webkit-scrollbar {
    display: none;
}
</style>