import { writable, readable } from 'svelte/store';

/* 쓰기 전용 */
export const season = writable("", () => {
  
    return () => {
    }
});

/* 읽기 전용 */
export let mouse = readable({
    season : 0
}, (set) => {

    return () => {
    }
});