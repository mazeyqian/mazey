<template>
    <div class="mv-table" style="background: #fff; width: 100%;" :style="tableStyle">
        <table class="table-bordered table-striped">
            <thead>
                <tr>
                    <th v-for="(h, index) in tableHeaders" :class="{'m-table-is-sort': h.isSort}">
                        {{ h.des }}
                        <span class="m-table-sort">
                            <i class="sort-ascend"></i>
                            <i class="sort-descend"></i>
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(b, index) in tableData">
                    <td v-for="(h, index) in tableHeaders">{{ b[h.name] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    // 基础表格组件
    import '@/components/base/table.css'
    export default {
        name: 'mv-table',
        data () {
            return {}
        },
        props: {
            tableHeaders: {
                type: Array,
                required: true
            },
            tableData: {
                type: Array,
                required: true
            },
            tableBackground: {
                type: String,
                default: '#fff'
            },
            tableWidth: {
                type: String,
                default: '100%'
            },
            tableStyle: {
                type: Object,
                default () {
                    return {
                        backGround: '#fff',
                        width: '100%'
                    }
                }
            }
        }
    }
</script>

<style>

</style>