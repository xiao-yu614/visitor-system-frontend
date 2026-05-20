<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Refresh } from "@element-plus/icons-vue";
import { getVisitRecordList, checkIn, checkOut } from "@/api/visitRecord";
import { recordStatusMap } from "@/types/visitRecord";
import type {
  VisitRecord,
  VisitRecordListParams,
  VisitRecordStatus,
} from "@/types/visitRecord";

const loading = ref(false);
const tableData = ref<VisitRecord[]>([]);
const total = ref(0);
const actionLoading = ref(false);
const currentActionId = ref("");
const currentActionType = ref<"checkIn" | "checkOut">("checkIn");

const searchParams = reactive<VisitRecordListParams>({
  visitorName: "",
  phone: "",
  status: undefined,
  startDate: "",
  endDate: "",
  page: 1,
  size: 10,
});

const fetchData = async () => {
  loading.value = true;
  try {
    const result: any = await getVisitRecordList(searchParams);
    console.log("Visit record list API response:", result);

    const responseData = result?.data || result;
    const pageData = responseData?.data || responseData;
    const records = pageData?.records || pageData?.list || [];

    tableData.value = records;
    total.value = pageData?.total || records.length;

    console.log("Final tableData:", tableData.value);
  } catch (error) {
    ElMessage.error("获取访问记录列表失败");
    console.error("Fetch visit record list failed:", error);
  } finally {
    loading.value = false;
  }
};

const handleRefresh = () => {
  searchParams.page = 1;
  fetchData();
};

const handleSearch = () => {
  searchParams.page = 1;
  fetchData();
};

const handleReset = () => {
  searchParams.visitorName = "";
  searchParams.phone = "";
  searchParams.status = undefined;
  searchParams.startDate = "";
  searchParams.endDate = "";
  searchParams.page = 1;
  fetchData();
};

const handlePageChange = (page: number) => {
  searchParams.page = page;
  fetchData();
};

const handleSizeChange = (size: number) => {
  searchParams.size = size;
  searchParams.page = 1;
  fetchData();
};

const handleCheckIn = (row: VisitRecord) => {
  currentActionId.value = row.id;
  currentActionType.value = "checkIn";
  confirmAction();
};

const handleCheckOut = (row: VisitRecord) => {
  currentActionId.value = row.id;
  currentActionType.value = "checkOut";
  confirmAction();
};

const confirmAction = async () => {
  const actionText =
    currentActionType.value === "checkIn" ? "入校登记" : "离校登记";
  const confirmText =
    currentActionType.value === "checkIn"
      ? "确定要为该访客办理入校登记吗？"
      : "确定要为该访客办理离校登记吗？";

  try {
    await ElMessageBox.confirm(confirmText, `${actionText}确认`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: currentActionType.value === "checkIn" ? "info" : "warning",
    });

    actionLoading.value = true;

    if (currentActionType.value === "checkIn") {
      await checkIn(currentActionId.value);
      ElMessage.success("入校登记成功");
    } else {
      await checkOut(currentActionId.value);
      ElMessage.success("离校登记成功");
    }

    fetchData();
  } catch (error: any) {
    if (error !== "cancel") {
      const errorMessage =
        error?.response?.data?.message || error?.message || "操作失败";
      ElMessage.error(errorMessage);
      console.error("Action failed:", error);
    }
  } finally {
    actionLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="visit-record">
    <div class="page-header">
      <h2>访问记录管理</h2>
      <p>查看和管理外来人员的访问记录</p>
    </div>

    <el-card class="table-card">
      <template #header>
        <div class="card-header">
          <div class="search-bar">
            <el-input
              v-model="searchParams.visitorName"
              placeholder="访客姓名"
              clearable
              style="width: 160px"
            />

            <el-input
              v-model="searchParams.phone"
              placeholder="手机号"
              clearable
              style="width: 160px"
            />

            <el-select
              v-model="searchParams.status"
              placeholder="访问状态"
              clearable
              style="width: 140px"
            >
              <el-option label="全部" :value="undefined" />
              <el-option
                v-for="(item, key) in recordStatusMap"
                :key="key"
                :label="item.label"
                :value="key as VisitRecordStatus"
              />
            </el-select>

            <el-date-picker
              v-model="searchParams.startDate"
              type="date"
              placeholder="开始日期"
              style="width: 160px"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />

            <el-date-picker
              v-model="searchParams.endDate"
              type="date"
              placeholder="结束日期"
              style="width: 160px"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />

            <el-button type="primary" @click="handleSearch"> 搜索 </el-button>

            <el-button @click="handleReset"> 重置 </el-button>

            <el-button @click="handleRefresh">
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </div>
        </div>
      </template>

      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        border
        stripe
      >
        <el-table-column prop="applyNo" label="申请编号" width="160" />
        <el-table-column prop="visitorName" label="访客姓名" width="100" />
        <el-table-column prop="phone" label="手机号" width="130" />
        <el-table-column prop="idCard" label="身份证号" width="170" />
        <el-table-column
          prop="company"
          label="所属单位"
          show-overflow-tooltip
          min-width="140"
        />
        <el-table-column prop="visitPerson" label="访问对象" width="100" />
        <el-table-column
          prop="reason"
          label="访问事由"
          show-overflow-tooltip
          min-width="140"
        />
        <el-table-column label="预计时间" width="280">
          <template #default="scope">
            <div>{{ scope.row.startTime }}</div>
            <div style="color: #909399; font-size: 12px">
              至 {{ scope.row.endTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="入校时间" width="170">
          <template #default="scope">
            <span v-if="scope.row.checkInTime">{{
              scope.row.checkInTime
            }}</span>
            <span v-else style="color: #c0c4cc">-</span>
          </template>
        </el-table-column>
        <el-table-column label="离校时间" width="170">
          <template #default="scope">
            <span v-if="scope.row.checkOutTime">{{
              scope.row.checkOutTime
            }}</span>
            <span v-else style="color: #c0c4cc">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="recordStatusMap[scope.row.status].type">
              {{ recordStatusMap[scope.row.status].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <template v-if="scope.row.status === 'WAITING_CHECK_IN'">
              <el-button
                type="primary"
                size="small"
                :loading="actionLoading && currentActionId === scope.row.id"
                @click="handleCheckIn(scope.row)"
              >
                入校登记
              </el-button>
            </template>
            <template v-else-if="scope.row.status === 'CHECKED_IN'">
              <el-button
                type="success"
                size="small"
                :loading="actionLoading && currentActionId === scope.row.id"
                @click="handleCheckOut(scope.row)"
              >
                离校登记
              </el-button>
            </template>
            <template v-else>
              <span style="color: #909399; font-size: 13px">-</span>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="searchParams.page"
        v-model:page-size="searchParams.size"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        style="margin-top: 20px; text-align: right"
      />
    </el-card>
  </div>
</template>

<style scoped>
.visit-record {
  padding: 10px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h2 {
  font-size: 24px;
  color: #303133;
  margin: 0 0 8px 0;
}

.page-header p {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.table-card {
  border-radius: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
