# Vue 3 + TypeScript + Vite

This template helps you start developing with Vue 3 and TypeScript in Vite. It uses Vue 3 `<script setup>` SFCs; see the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) for details.

For recommended project setup and IDE support, refer to the [Vue Docs TypeScript Guide][def].


## Node version 22.11.0

## Set-ExecutionPolicy

Get-ExecutionPolicy -List

Set-ExecutionPolicy RemoteSigned

## RUN 

```sh
npm i

npm run build 

npm run preview
```

## build

default env  ".env.dev"

```sh
docker buildx build -t docker.io/wachiradu/private:posking-web-v1 . --no-cache

docker push docker.io/wachiradu/private:posking-web-v1
```


## Dependencies

These are the project dependencies:

* **vue:** "^3.5.13" - Vue.js framework.
* **vue-router:** "^4.5.1" - Vue.js router.
* **pinia:** "^3.0.2" - Vue.js state management.
* **tailwindcss:** "^4.1.8" - CSS framework.
* **@casl/ability:** "^6.7.3" - Authorization library.
* **@casl/vue:** "^2.2.2" - Vue.js integration for CASL.
* **@tailwindcss/vite:** "^4.1.8" - Tailwind CSS plugin for Vite.
* **daisyui:** "^5.0.43" - Tailwind CSS component library.
* **vue-i18n:** "^11.1.5" - Internationalization plugin for Vue.js
* **vue-chartjs:** "^5.3.2" - Vue.js wrapper for Chart.js.
* **chart.js:** "^4.5.0" - Flexible JavaScript charting library.
* **js-cookie:** "^3.0.5" - Simple JavaScript API for handling cookies.
* **overlayscrollbars:** "^2.11.4" - Custom scrollbar library.
* **@tanstack/vue-query:** "^5.80.7" - Vue.js query client for data fetching, caching, and synchronization.
* **@tanstack/vue-query-devtools:** "^5.80.10" - Devtools for @tanstack/vue-query.
* **axios:** "^1.9.0" - Promise-based HTTP client.

[def]: https://vuejs.org/guide/typescript/overview.html#project-setup
