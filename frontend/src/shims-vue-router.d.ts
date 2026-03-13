declare module "vue-router" {
    import type { RouteRecordRaw, Router, RouterOptions } from "vue-router/dist/vue-router";

    export function createRouter(options: RouterOptions): Router;

    export function createWebHistory(base?: string): any;

    export function createMemoryHistory(base?: string): any;

    export function createWebHashHistory(base?: string): any;

    // Re-exports the imported type for access in other locations
    export { RouteRecordRaw, Router, RouterOptions };

    // Export all other types from "vue-router/dist/vue-router".
    export * from "vue-router/dist/vue-router"; // eslint-disable-line import/no-unresolved, import/extensions
}
