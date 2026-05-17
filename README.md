# 外来人员访校系统 - 前端项目

## 项目简介

外来人员访校系统前端项目，基于 Vue 3 + Vite + TypeScript + Element Plus 技术栈开发。

## 技术栈

- **框架**: Vue 3.4+ (Composition API)
- **构建工具**: Vite 5.0+
- **语言**: TypeScript 5.3+
- **UI组件库**: Element Plus 2.5+
- **路由**: Vue Router 4.2+
- **状态管理**: Pinia 2.1+
- **HTTP请求**: Axios 1.6+

## 项目结构

```
visitor-system-frontend/
├── src/
│   ├── api/          # API 接口模块
│   ├── components/   # 组件
│   ├── router/       # 路由配置
│   ├── stores/       # 状态管理
│   ├── styles/       # 全局样式
│   ├── types/        # TypeScript 类型定义
│   ├── utils/        # 工具函数
│   ├── views/        # 页面组件
│   ├── App.vue       # 根组件
│   └── main.ts       # 入口文件
├── docs/             # 项目文档
├── .env              # 环境变量
├── package.json      # 依赖配置
├── vite.config.ts    # Vite 配置
└── tsconfig.json     # TypeScript 配置
```

## 安装与运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动后访问: http://localhost:5173

### 生产构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录

### 预览生产版本

```bash
npm run preview
```

## 页面清单

| 页面 | 路径 | 说明 | 是否需要登录 |
|------|------|------|-------------|
| 访客申请页 | `/apply` | 外来人员提交访校申请 | ❌ |
| 管理员登录 | `/login` | 管理员登录入口 | ❌ |
| 管理后台首页 | `/admin` | 统计数据展示 | ✅ |
| 申请管理 | `/admin/apply-list` | 访校申请列表与审批 | ✅ |
| 访问记录 | `/admin/visit-record` | 访问记录管理 | ✅ |

## 测试账号

| 字段 | 值 |
|------|-----|
| 用户名 | admin |
| 密码 | 123456 |

## 接口联调

### 后端服务地址

默认配置：`http://localhost:8080/api`

### 环境变量配置

在 `.env` 文件中配置：

```
VITE_API_BASE_URL=http://localhost:8080/api
```

### API 接口列表

| 模块 | 接口 | 方法 | 需要登录 |
|------|------|------|----------|
| 认证 | `/auth/login` | POST | ❌ |
| 认证 | `/auth/logout` | POST | ✅ |
| 访客申请 | `/visit/apply` | POST | ❌ |
| 审批 | `/admin/apply/list` | GET | ✅ |
| 审批 | `/admin/apply/{id}/approve` | PUT | ✅ |
| 访问记录 | `/admin/visit-record/list` | GET | ✅ |
| 访问记录 | `/visit-record/{id}/check-in` | PUT | ✅ |
| 访问记录 | `/visit-record/{id}/check-out` | PUT | ✅ |
| 统计 | `/admin/statistics` | GET | ✅ |

## 开发规范

### 代码风格

- 使用 TypeScript，严格模式
- 使用 Vue 3 Composition API
- 变量命名使用 camelCase
- 组件命名使用 PascalCase
- 接口命名使用 I 前缀（如 IUserInfo）

### 提交规范

```
feat: 新增功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
```

## License

MIT