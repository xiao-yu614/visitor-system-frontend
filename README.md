# 外来人员访校系统 - 前端

## 项目简介

外来人员访校系统前端项目，用于管理外来人员的访校申请、审批和记录管理。

## 技术栈

- Vue 3 + Composition API
- TypeScript
- Vite 5
- Element Plus
- Vue Router 4
- Pinia
- Axios

## 项目结构

```
src/
├── api/           # API请求层
├── assets/        # 静态资源
├── components/    # 组件
│   ├── common/    # 公共组件
│   └── layout/    # 布局组件
├── router/        # 路由配置
├── stores/        # 状态管理
├── styles/        # 全局样式
├── types/         # TypeScript类型定义
├── utils/         # 工具函数
└── views/         # 页面组件
    ├── visitor/   # 访客端页面
    ├── auth/      # 认证页面
    └── admin/     # 管理端页面
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 环境变量

在项目根目录创建 `.env` 文件，配置以下环境变量：

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 风格
- 使用 Pinia 进行状态管理
- 使用 Element Plus 组件库
- 代码提交前执行 `npm run lint` 检查

## 目录说明

| 目录 | 说明 |
|------|------|
| `api/` | 封装后端 API 请求 |
| `components/` | 可复用的 Vue 组件 |
| `router/` | 路由配置 |
| `stores/` | Pinia 状态管理 |
| `styles/` | 全局样式和变量 |
| `types/` | TypeScript 类型定义 |
| `utils/` | 工具函数 |
| `views/` | 页面级组件 |
