<template>
    <div class="w-full flex flex-col items-center justify-start">
        <div class="w-full flex items-center justify-around px-3 my-4 relative">
            <button class="px-6 h-[38px] rounded-full bg-[#4B5563] font-bold" @click.stop="toggleRangePicker" circle plain>
                {{ currentRange }}
            </button>
            <div class="self-center">
                <el-date-picker :clearable="false" :format="dayFormat"
                    :value-format="dayFormat" v-if="currentRageDay" v-model="timeValue" type="date" placeholder="選擇日"
                    ref="timePicker" @change="change" />
                <el-date-picker :clearable="false" :format="monthFormat"
                    :value-format="monthFormat" v-if="currentRageMonth" v-model="timeValue" type="month"
                    placeholder="選擇月份" ref="timePicker" @change="change" />
                <el-date-picker :clearable="false" :format="yearFormat"
                    :value-format="yearFormat" v-if="currentRageYear" v-model="timeValue" type="year" placeholder="選擇年份"
                    ref="timePicker" @change="change" />
            </div>
        </div>
        <div class="w-full flex items-center justify-around px-3">
            <div class="flex flex-col items-start justify-start gap-3">
                <el-statistic :value="displayIncome">
                    <template #title>
                        <div class="text-base text-[#52BFEA] font-medium">{{ currentRange }}收入</div>
                    </template>
                </el-statistic>
                <el-statistic :value="displayExpense">
                    <template #title>
                        <div class="text-base text-[#F5E866] font-medium">{{ currentRange }}支出</div>
                    </template>
                </el-statistic>
            </div>

            <el-progress :stroke-width="12" stroke-linecap="square" type="circle" :indeterminate="true" :duration="10"
                :percentage="progressPercentage" :width="140">
                <template #default>
                    <el-statistic :value="displayBalance">
                        <template #title>
                            <div class="text-white text-base">餘額</div>
                        </template>
                    </el-statistic>
                </template>
            </el-progress>
        </div>
        <div class="absolute bottom-4 flex w-full items-center justify-center">
            <el-button type="primary" circle size="large">
                <template #icon>
                    <el-icon size="42">
                        <CirclePlusFilled />
                    </el-icon>
                </template>
            </el-button>
        </div>

    </div>
</template>
<script>
export default {
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
            expense: 34521,
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
                this.timeValue = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
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
        }
    },
    methods: {
        startAnimation() {
            const duration = 1000;
            const startTime = performance.now();
            const balance = this.income - this.expense;
            this.progressPercentage = balance <= 0 ? 0 : Math.floor((balance / this.income) * 100);
            
            const animate = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                this.displayBalance = Math.floor(balance * progress);
                this.displayIncome = Math.floor(this.income * progress);
                this.displayExpense = Math.floor(this.expense * progress);
                // this.progressPercentage = balance <= 0 ? 0 : Math.floor((balance / this.income) * 100);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        },
        // startAnimation() {
        //     const duration = 2000; // 動畫持續時間 2 秒
        //     const interval = 20; // 每 20 毫秒更新一次
        //     const step = this.balance / (duration / interval); // 每次增加的值

        //     const intervalId = setInterval(() => {
        //         if (this.displayBalance < this.balance) {
        //             this.displayBalance += step;
        //             if (this.displayBalance >= this.balance) {
        //                 this.displayBalance = this.balance;
        //                 clearInterval(intervalId);
        //             }
        //         } else {
        //             clearInterval(intervalId);
        //         }
        //     }, interval);
        // },
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
<style>
</style>