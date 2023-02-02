
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function (jquery) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var jquery__default = /*#__PURE__*/_interopDefaultLegacy(jquery);

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty$3() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash$2(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash$2(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately after the component has been updated.
     *
     * The first time the callback runs will be after the initial `onMount`
     */
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-getcontext
     */
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        const options = { direction: 'in' };
        let config = fn(node, params, options);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config(options);
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        const options = { direction: 'out' };
        let config = fn(node, params, options);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config(options);
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    /* 쓰기 전용 */
    const season = writable("", () => {
      
        return () => {
        }
    });
    const ContextVisible = writable("", () => {
      
        return () => {
        }
    });

    /* 쓰기 전용 */
    const bench = writable("", () => {
      
        return () => {
        }
    });
    const fish_01 = writable("", () => {
      
        return () => {
        }
    });
      
    const fish_02 = writable("", () => {
      
        return () => {
        }
    });

    const fish_03 = writable("", () => {
      
        return () => {
        }
    });
    const fish_04 = writable("", () => {
      
        return () => {
        }
    });
    const fish_05 = writable("", () => {
      
        return () => {
        }
    });
      
    const fish_06 = writable("", () => {
      
        return () => {
        }
    });

    const fish_07 = writable("", () => {
      
        return () => {
        }
    });
    const fish_08 = writable("", () => {
      
        return () => {
        }
    });
    const fish_09 = writable("", () => {
      
        return () => {
        }
    });
      
    const fish_10 = writable("", () => {
      
        return () => {
        }
    });

    const fish_11 = writable("", () => {
      
        return () => {
        }
    });
    const fish_12 = writable("", () => {
      
        return () => {
        }
    });



    /* 읽기 전용 */
    let fish = readable({
        fish_01 : "",
        fish_02 : "",
        fish_03 : "",
        fish_04 : "",
        fish_05 : "",
        fish_06 : "",
        fish_07 : "",
        fish_08 : "",
        fish_09 : "",
        fish_10 : "",
        fish_11 : "",
        fish_12 : "",
    }, (set) => {

        return () => {
        }
    });

    function toClassName(value) {
      let result = '';

      if (typeof value === 'string' || typeof value === 'number') {
        result += value;
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
          result = value.map(toClassName).filter(Boolean).join(' ');
        } else {
          for (let key in value) {
            if (value[key]) {
              result && (result += ' ');
              result += key;
            }
          }
        }
      }

      return result;
    }

    function classnames(...args) {
      return args.map(toClassName).filter(Boolean).join(' ');
    }

    function getTransitionDuration(element) {
      if (!element) return 0;

      // Get transition-duration of the element
      let { transitionDuration, transitionDelay } =
        window.getComputedStyle(element);

      const floatTransitionDuration = Number.parseFloat(transitionDuration);
      const floatTransitionDelay = Number.parseFloat(transitionDelay);

      // Return 0 if element or transition duration is not found
      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      }

      // If multiple durations are defined, take the first
      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];

      return (
        (Number.parseFloat(transitionDuration) +
          Number.parseFloat(transitionDelay)) *
        1000
      );
    }

    function collapseOut(node, params) {
      const dimension = params.horizontal ? 'width' : 'height';
      node.style[dimension] = `${node.getBoundingClientRect()[dimension]}px`;
      node.classList.add('collapsing');
      node.classList.remove('collapse', 'show');
      const duration = getTransitionDuration(node);

      return {
        duration,
        tick: (t) => {
          if (t > 0) {
            node.style[dimension] = '';
          } else if (t === 0) {
            node.classList.remove('collapsing');
            node.classList.add('collapse');
          }
        }
      };
    }

    function collapseIn(node, params) {
      const horizontal = params.horizontal;
      const dimension = horizontal ? 'width' : 'height';
      node.classList.add('collapsing');
      node.classList.remove('collapse', 'show');
      node.style[dimension] = 0;
      const duration = getTransitionDuration(node);

      return {
        duration,
        tick: (t) => {
          if (t < 1) {
            if (horizontal) {
              node.style.width = `${node.scrollWidth}px`;
            } else {
              node.style.height = `${node.scrollHeight}px`;
            }
          } else {
            node.classList.remove('collapsing');
            node.classList.add('collapse', 'show');
            node.style[dimension] = '';
          }
        }
      };
    }

    const defaultToggleEvents = ['touchstart', 'click'];

    var toggle = (toggler, togglerFn) => {
      let unbindEvents;

      if (
        typeof toggler === 'string' &&
        typeof window !== 'undefined' &&
        document &&
        document.createElement
      ) {
        let selection = document.querySelectorAll(toggler);
        if (!selection.length) {
          selection = document.querySelectorAll(`#${toggler}`);
        }
        if (!selection.length) {
          throw new Error(
            `The target '${toggler}' could not be identified in the dom, tip: check spelling`
          );
        }

        defaultToggleEvents.forEach((event) => {
          selection.forEach((element) => {
            element.addEventListener(event, togglerFn);
          });
        });

        unbindEvents = () => {
          defaultToggleEvents.forEach((event) => {
            selection.forEach((element) => {
              element.removeEventListener(event, togglerFn);
            });
          });
        };
      }

      return () => {
        if (typeof unbindEvents === 'function') {
          unbindEvents();
          unbindEvents = undefined;
        }
      };
    };

    /* node_modules\sveltestrap\src\Collapse.svelte generated by Svelte v3.55.1 */
    const file$19 = "node_modules\\sveltestrap\\src\\Collapse.svelte";

    // (61:0) {#if isOpen}
    function create_if_block$b(ctx) {
    	let div;
    	let div_style_value;
    	let div_intro;
    	let div_outro;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	let div_levels = [
    		{
    			style: div_style_value = /*navbar*/ ctx[2] ? undefined : 'overflow: hidden;'
    		},
    		/*$$restProps*/ ctx[9],
    		{ class: /*classes*/ ctx[8] }
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$19, 61, 2, 1551);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "introstart", /*introstart_handler*/ ctx[17], false, false, false),
    					listen_dev(div, "introend", /*introend_handler*/ ctx[18], false, false, false),
    					listen_dev(div, "outrostart", /*outrostart_handler*/ ctx[19], false, false, false),
    					listen_dev(div, "outroend", /*outroend_handler*/ ctx[20], false, false, false),
    					listen_dev(
    						div,
    						"introstart",
    						function () {
    							if (is_function(/*onEntering*/ ctx[3])) /*onEntering*/ ctx[3].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						div,
    						"introend",
    						function () {
    							if (is_function(/*onEntered*/ ctx[4])) /*onEntered*/ ctx[4].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						div,
    						"outrostart",
    						function () {
    							if (is_function(/*onExiting*/ ctx[5])) /*onExiting*/ ctx[5].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						div,
    						"outroend",
    						function () {
    							if (is_function(/*onExited*/ ctx[6])) /*onExited*/ ctx[6].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				(!current || dirty & /*navbar*/ 4 && div_style_value !== (div_style_value = /*navbar*/ ctx[2] ? undefined : 'overflow: hidden;')) && { style: div_style_value },
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				(!current || dirty & /*classes*/ 256) && { class: /*classes*/ ctx[8] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, collapseIn, { horizontal: /*horizontal*/ ctx[1] });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (div_intro) div_intro.invalidate();

    			if (local) {
    				div_outro = create_out_transition(div, collapseOut, { horizontal: /*horizontal*/ ctx[1] });
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && div_outro) div_outro.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(61:0) {#if isOpen}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1a(ctx) {
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[21]);
    	let if_block = /*isOpen*/ ctx[0] && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$3();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "resize", /*onwindowresize*/ ctx[21]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*isOpen*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*isOpen*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$b(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1a($$self, $$props, $$invalidate) {
    	let classes;

    	const omit_props_names = [
    		"isOpen","class","horizontal","navbar","onEntering","onEntered","onExiting","onExited","expand","toggler"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Collapse', slots, ['default']);
    	const dispatch = createEventDispatcher();
    	let { isOpen = false } = $$props;
    	let { class: className = '' } = $$props;
    	let { horizontal = false } = $$props;
    	let { navbar = false } = $$props;
    	let { onEntering = () => dispatch('opening') } = $$props;
    	let { onEntered = () => dispatch('open') } = $$props;
    	let { onExiting = () => dispatch('closing') } = $$props;
    	let { onExited = () => dispatch('close') } = $$props;
    	let { expand = false } = $$props;
    	let { toggler = null } = $$props;

    	onMount(() => toggle(toggler, e => {
    		$$invalidate(0, isOpen = !isOpen);
    		e.preventDefault();
    	}));

    	let windowWidth = 0;
    	let _wasMaximized = false;

    	// TODO wrong to hardcode these here - come from Bootstrap CSS only
    	const minWidth = {};

    	minWidth['xs'] = 0;
    	minWidth['sm'] = 576;
    	minWidth['md'] = 768;
    	minWidth['lg'] = 992;
    	minWidth['xl'] = 1200;

    	function notify() {
    		dispatch('update', isOpen);
    	}

    	function introstart_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function introend_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function outrostart_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function outroend_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function onwindowresize() {
    		$$invalidate(7, windowWidth = window.innerWidth);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('isOpen' in $$new_props) $$invalidate(0, isOpen = $$new_props.isOpen);
    		if ('class' in $$new_props) $$invalidate(10, className = $$new_props.class);
    		if ('horizontal' in $$new_props) $$invalidate(1, horizontal = $$new_props.horizontal);
    		if ('navbar' in $$new_props) $$invalidate(2, navbar = $$new_props.navbar);
    		if ('onEntering' in $$new_props) $$invalidate(3, onEntering = $$new_props.onEntering);
    		if ('onEntered' in $$new_props) $$invalidate(4, onEntered = $$new_props.onEntered);
    		if ('onExiting' in $$new_props) $$invalidate(5, onExiting = $$new_props.onExiting);
    		if ('onExited' in $$new_props) $$invalidate(6, onExited = $$new_props.onExited);
    		if ('expand' in $$new_props) $$invalidate(11, expand = $$new_props.expand);
    		if ('toggler' in $$new_props) $$invalidate(12, toggler = $$new_props.toggler);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		onMount,
    		collapseIn,
    		collapseOut,
    		classnames,
    		toggle,
    		dispatch,
    		isOpen,
    		className,
    		horizontal,
    		navbar,
    		onEntering,
    		onEntered,
    		onExiting,
    		onExited,
    		expand,
    		toggler,
    		windowWidth,
    		_wasMaximized,
    		minWidth,
    		notify,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$new_props.isOpen);
    		if ('className' in $$props) $$invalidate(10, className = $$new_props.className);
    		if ('horizontal' in $$props) $$invalidate(1, horizontal = $$new_props.horizontal);
    		if ('navbar' in $$props) $$invalidate(2, navbar = $$new_props.navbar);
    		if ('onEntering' in $$props) $$invalidate(3, onEntering = $$new_props.onEntering);
    		if ('onEntered' in $$props) $$invalidate(4, onEntered = $$new_props.onEntered);
    		if ('onExiting' in $$props) $$invalidate(5, onExiting = $$new_props.onExiting);
    		if ('onExited' in $$props) $$invalidate(6, onExited = $$new_props.onExited);
    		if ('expand' in $$props) $$invalidate(11, expand = $$new_props.expand);
    		if ('toggler' in $$props) $$invalidate(12, toggler = $$new_props.toggler);
    		if ('windowWidth' in $$props) $$invalidate(7, windowWidth = $$new_props.windowWidth);
    		if ('_wasMaximized' in $$props) $$invalidate(13, _wasMaximized = $$new_props._wasMaximized);
    		if ('classes' in $$props) $$invalidate(8, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, horizontal, navbar*/ 1030) {
    			$$invalidate(8, classes = classnames(className, {
    				'collapse-horizontal': horizontal,
    				'navbar-collapse': navbar
    			}));
    		}

    		if ($$self.$$.dirty & /*navbar, expand, windowWidth, minWidth, isOpen, _wasMaximized*/ 26757) {
    			if (navbar && expand) {
    				if (windowWidth >= minWidth[expand] && !isOpen) {
    					$$invalidate(0, isOpen = true);
    					$$invalidate(13, _wasMaximized = true);
    					notify();
    				} else if (windowWidth < minWidth[expand] && _wasMaximized) {
    					$$invalidate(0, isOpen = false);
    					$$invalidate(13, _wasMaximized = false);
    					notify();
    				}
    			}
    		}
    	};

    	return [
    		isOpen,
    		horizontal,
    		navbar,
    		onEntering,
    		onEntered,
    		onExiting,
    		onExited,
    		windowWidth,
    		classes,
    		$$restProps,
    		className,
    		expand,
    		toggler,
    		_wasMaximized,
    		minWidth,
    		$$scope,
    		slots,
    		introstart_handler,
    		introend_handler,
    		outrostart_handler,
    		outroend_handler,
    		onwindowresize
    	];
    }

    class Collapse extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1a, create_fragment$1a, safe_not_equal, {
    			isOpen: 0,
    			class: 10,
    			horizontal: 1,
    			navbar: 2,
    			onEntering: 3,
    			onEntered: 4,
    			onExiting: 5,
    			onExited: 6,
    			expand: 11,
    			toggler: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Collapse",
    			options,
    			id: create_fragment$1a.name
    		});
    	}

    	get isOpen() {
    		throw new Error("<Collapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error("<Collapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Collapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Collapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get horizontal() {
    		throw new Error("<Collapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set horizontal(value) {
    		throw new Error("<Collapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get navbar() {
    		throw new Error("<Collapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set navbar(value) {
    		throw new Error("<Collapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onEntering() {
    		throw new Error("<Collapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onEntering(value) {
    		throw new Error("<Collapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onEntered() {
    		throw new Error("<Collapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onEntered(value) {
    		throw new Error("<Collapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onExiting() {
    		throw new Error("<Collapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onExiting(value) {
    		throw new Error("<Collapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onExited() {
    		throw new Error("<Collapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onExited(value) {
    		throw new Error("<Collapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get expand() {
    		throw new Error("<Collapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set expand(value) {
    		throw new Error("<Collapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get toggler() {
    		throw new Error("<Collapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set toggler(value) {
    		throw new Error("<Collapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function circInOut(t) {
        if ((t *= 2) < 1)
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    }
    function cubicInOut(t) {
        return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
    }
    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }
    function expoInOut(t) {
        return t === 0.0 || t === 1.0
            ? t
            : t < 0.5
                ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
                : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    function getWindow(node) {
      if (node == null) {
        return window;
      }

      if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }

      return node;
    }

    function isElement(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }

    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }

    function isShadowRoot(node) {
      // IE 11 has no ShadowRoot
      if (typeof ShadowRoot === 'undefined') {
        return false;
      }

      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }

    var max = Math.max;
    var min = Math.min;
    var round = Math.round;

    function getUAString() {
      var uaData = navigator.userAgentData;

      if (uaData != null && uaData.brands) {
        return uaData.brands.map(function (item) {
          return item.brand + "/" + item.version;
        }).join(' ');
      }

      return navigator.userAgent;
    }

    function isLayoutViewport() {
      return !/^((?!chrome|android).)*safari/i.test(getUAString());
    }

    function getBoundingClientRect(element, includeScale, isFixedStrategy) {
      if (includeScale === void 0) {
        includeScale = false;
      }

      if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
      }

      var clientRect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;

      if (includeScale && isHTMLElement(element)) {
        scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
        scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
      }

      var _ref = isElement(element) ? getWindow(element) : window,
          visualViewport = _ref.visualViewport;

      var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
      var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
      var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
      var width = clientRect.width / scaleX;
      var height = clientRect.height / scaleY;
      return {
        width: width,
        height: height,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        x: x,
        y: y
      };
    }

    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }

    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }

    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }

    function getNodeName(element) {
      return element ? (element.nodeName || '').toLowerCase() : null;
    }

    function getDocumentElement(element) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
      element.document) || window.document).documentElement;
    }

    function getWindowScrollBarX(element) {
      // If <html> has a CSS width greater than the viewport, then this will be
      // incorrect for RTL.
      // Popper 1 is broken in this case and never had a bug report so let's assume
      // it's not an issue. I don't think anyone ever specifies width on <html>
      // anyway.
      // Browsers where the left scrollbar doesn't cause an issue report `0` for
      // this (e.g. Edge 2019, IE11, Safari)
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }

    function getComputedStyle$1(element) {
      return getWindow(element).getComputedStyle(element);
    }

    function isScrollParent(element) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle$1(element),
          overflow = _getComputedStyle.overflow,
          overflowX = _getComputedStyle.overflowX,
          overflowY = _getComputedStyle.overflowY;

      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }

    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = round(rect.width) / element.offsetWidth || 1;
      var scaleY = round(rect.height) / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    } // Returns the composite rect of an element relative to its offsetParent.
    // Composite means it takes into account transforms as well as layout.


    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }

      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };

      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }

        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent, true);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }

      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }

    // means it doesn't take into account transforms.

    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
      // Fixes https://github.com/popperjs/popper-core/issues/1223

      var width = element.offsetWidth;
      var height = element.offsetHeight;

      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }

      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }

      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height
      };
    }

    function getParentNode(element) {
      if (getNodeName(element) === 'html') {
        return element;
      }

      return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || ( // DOM Element detected
        isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element) // fallback

      );
    }

    function getScrollParent(node) {
      if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe[incompatible-return]: assume body is always available
        return node.ownerDocument.body;
      }

      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }

      return getScrollParent(getParentNode(node));
    }

    /*
    given a DOM element, return the list of all scroll parents, up the list of ancesors
    until we get to the top window object. This list is what we attach scroll listeners
    to, because if any of these parent elements scroll, we'll need to re-calculate the
    reference element's position.
    */

    function listScrollParents(element, list) {
      var _element$ownerDocumen;

      if (list === void 0) {
        list = [];
      }

      var scrollParent = getScrollParent(element);
      var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win = getWindow(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)));
    }

    function isTableElement(element) {
      return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
    }

    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle$1(element).position === 'fixed') {
        return null;
      }

      return element.offsetParent;
    } // `.offsetParent` reports `null` for fixed elements, while absolute elements
    // return the containing block


    function getContainingBlock(element) {
      var isFirefox = /firefox/i.test(getUAString());
      var isIE = /Trident/i.test(getUAString());

      if (isIE && isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = getComputedStyle$1(element);

        if (elementCss.position === 'fixed') {
          return null;
        }
      }

      var currentNode = getParentNode(element);

      if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
      }

      while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

        if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }

      return null;
    } // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.


    function getOffsetParent(element) {
      var window = getWindow(element);
      var offsetParent = getTrueOffsetParent(element);

      while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
        offsetParent = getTrueOffsetParent(offsetParent);
      }

      if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
        return window;
      }

      return offsetParent || getContainingBlock(element) || window;
    }

    var top = 'top';
    var bottom = 'bottom';
    var right = 'right';
    var left = 'left';
    var auto = 'auto';
    var basePlacements = [top, bottom, right, left];
    var start = 'start';
    var end = 'end';
    var clippingParents = 'clippingParents';
    var viewport = 'viewport';
    var popper = 'popper';
    var reference = 'reference';
    var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []); // modifiers that need to read the DOM

    var beforeRead = 'beforeRead';
    var read = 'read';
    var afterRead = 'afterRead'; // pure-logic modifiers

    var beforeMain = 'beforeMain';
    var main = 'main';
    var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

    var beforeWrite = 'beforeWrite';
    var write = 'write';
    var afterWrite = 'afterWrite';
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

    function order(modifiers) {
      var map = new Map();
      var visited = new Set();
      var result = [];
      modifiers.forEach(function (modifier) {
        map.set(modifier.name, modifier);
      }); // On visiting object, check for its dependencies and visit them recursively

      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function (dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);

            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }

      modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
          // check for visited object
          sort(modifier);
        }
      });
      return result;
    }

    function orderModifiers(modifiers) {
      // order based on dependencies
      var orderedModifiers = order(modifiers); // order based on phase

      return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(orderedModifiers.filter(function (modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }

    function debounce(fn) {
      var pending;
      return function () {
        if (!pending) {
          pending = new Promise(function (resolve) {
            Promise.resolve().then(function () {
              pending = undefined;
              resolve(fn());
            });
          });
        }

        return pending;
      };
    }

    function getBasePlacement(placement) {
      return placement.split('-')[0];
    }

    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function (merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged;
      }, {}); // IE11 does not support Object.values

      return Object.keys(merged).map(function (key) {
        return merged[key];
      });
    }

    function getViewportRect(element, strategy) {
      var win = getWindow(element);
      var html = getDocumentElement(element);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0;

      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        var layoutViewport = isLayoutViewport();

        if (layoutViewport || !layoutViewport && strategy === 'fixed') {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }

      return {
        width: width,
        height: height,
        x: x + getWindowScrollBarX(element),
        y: y
      };
    }

    // of the `<html>` and `<body>` rect bounds if horizontally scrollable

    function getDocumentRect(element) {
      var _element$ownerDocumen;

      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;

      if (getComputedStyle$1(body || html).direction === 'rtl') {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
      }

      return {
        width: width,
        height: height,
        x: x,
        y: y
      };
    }

    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

      if (parent.contains(child)) {
        return true;
      } // then fallback to custom implementation with Shadow DOM support
      else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;

          do {
            if (next && parent.isSameNode(next)) {
              return true;
            } // $FlowFixMe[prop-missing]: need a better way to handle this...


            next = next.parentNode || next.host;
          } while (next);
        } // Give up, the result is false


      return false;
    }

    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }

    function getInnerBoundingClientRect(element, strategy) {
      var rect = getBoundingClientRect(element, false, strategy === 'fixed');
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }

    function getClientRectFromMixedType(element, clippingParent, strategy) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`


    function getClippingParents(element) {
      var clippingParents = listScrollParents(getParentNode(element));
      var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

      if (!isElement(clipperElement)) {
        return [];
      } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


      return clippingParents.filter(function (clippingParent) {
        return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
      });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents


    function getClippingRect(element, boundary, rootBoundary, strategy) {
      var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
      var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents[0];
      var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent, strategy);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent, strategy));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }

    function getVariation(placement) {
      return placement.split('-')[1];
    }

    function getMainAxisFromPlacement(placement) {
      return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
    }

    function computeOffsets(_ref) {
      var reference = _ref.reference,
          element = _ref.element,
          placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference.x + reference.width / 2 - element.width / 2;
      var commonY = reference.y + reference.height / 2 - element.height / 2;
      var offsets;

      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference.y - element.height
          };
          break;

        case bottom:
          offsets = {
            x: commonX,
            y: reference.y + reference.height
          };
          break;

        case right:
          offsets = {
            x: reference.x + reference.width,
            y: commonY
          };
          break;

        case left:
          offsets = {
            x: reference.x - element.width,
            y: commonY
          };
          break;

        default:
          offsets = {
            x: reference.x,
            y: reference.y
          };
      }

      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

      if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';

        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
            break;

          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
            break;
        }
      }

      return offsets;
    }

    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }

    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }

    function expandToHashMap(value, keys) {
      return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }

    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          _options$placement = _options.placement,
          placement = _options$placement === void 0 ? state.placement : _options$placement,
          _options$strategy = _options.strategy,
          strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
          _options$boundary = _options.boundary,
          boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
          _options$rootBoundary = _options.rootBoundary,
          rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
          _options$elementConte = _options.elementContext,
          elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
          _options$altBoundary = _options.altBoundary,
          altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
          _options$padding = _options.padding,
          padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
      // 0 or negative = within the clipping rect

      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

      if (elementContext === popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
          overflowOffsets[key] += offset[axis] * multiply;
        });
      }

      return overflowOffsets;
    }

    var DEFAULT_OPTIONS = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    };

    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return !args.some(function (element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
      });
    }

    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }

      var _generatorOptions = generatorOptions,
          _generatorOptions$def = _generatorOptions.defaultModifiers,
          defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
          _generatorOptions$def2 = _generatorOptions.defaultOptions,
          defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper(reference, popper, options) {
        if (options === void 0) {
          options = defaultOptions;
        }

        var state = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference,
            popper: popper
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state: state,
          setOptions: function setOptions(setOptionsAction) {
            var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions, state.options, options);
            state.scrollParents = {
              reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
              popper: listScrollParents(popper)
            }; // Orders the modifiers based on their dependencies and `phase`
            // properties

            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

            state.orderedModifiers = orderedModifiers.filter(function (m) {
              return m.enabled;
            }); // Validate the provided modifiers so that the consumer will get warned

            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }

            var _state$elements = state.elements,
                reference = _state$elements.reference,
                popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
            // anymore

            if (!areValidElements(reference, popper)) {

              return;
            } // Store the reference and popper rects to be read by modifiers


            state.rects = {
              reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
              popper: getLayoutRect(popper)
            }; // Modifiers have the ability to reset the current update cycle. The
            // most common use case for this is the `flip` modifier changing the
            // placement, which then needs to re-run all the modifiers, because the
            // logic was previously ran for the previous placement and is therefore
            // stale/incorrect

            state.reset = false;
            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
            // is filled with the initial data specified by the modifier. This means
            // it doesn't persist and is fresh on each update.
            // To ensure persistent data, use `${name}#persistent`

            state.orderedModifiers.forEach(function (modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });

            for (var index = 0; index < state.orderedModifiers.length; index++) {

              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }

              var _state$orderedModifie = state.orderedModifiers[index],
                  fn = _state$orderedModifie.fn,
                  _state$orderedModifie2 = _state$orderedModifie.options,
                  _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                  name = _state$orderedModifie.name;

              if (typeof fn === 'function') {
                state = fn({
                  state: state,
                  options: _options,
                  name: name,
                  instance: instance
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function () {
            return new Promise(function (resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };

        if (!areValidElements(reference, popper)) {

          return instance;
        }

        instance.setOptions(options).then(function (state) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state);
          }
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.

        function runModifierEffects() {
          state.orderedModifiers.forEach(function (_ref3) {
            var name = _ref3.name,
                _ref3$options = _ref3.options,
                options = _ref3$options === void 0 ? {} : _ref3$options,
                effect = _ref3.effect;

            if (typeof effect === 'function') {
              var cleanupFn = effect({
                state: state,
                name: name,
                instance: instance,
                options: options
              });

              var noopFn = function noopFn() {};

              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }

        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function (fn) {
            return fn();
          });
          effectCleanupFns = [];
        }

        return instance;
      };
    }

    var passive = {
      passive: true
    };

    function effect$2(_ref) {
      var state = _ref.state,
          instance = _ref.instance,
          options = _ref.options;
      var _options$scroll = options.scroll,
          scroll = _options$scroll === void 0 ? true : _options$scroll,
          _options$resize = options.resize,
          resize = _options$resize === void 0 ? true : _options$resize;
      var window = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.addEventListener('resize', instance.update, passive);
      }

      return function () {
        if (scroll) {
          scrollParents.forEach(function (scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
          });
        }

        if (resize) {
          window.removeEventListener('resize', instance.update, passive);
        }
      };
    } // eslint-disable-next-line import/no-unused-modules


    var eventListeners = {
      name: 'eventListeners',
      enabled: true,
      phase: 'write',
      fn: function fn() {},
      effect: effect$2,
      data: {}
    };

    function popperOffsets(_ref) {
      var state = _ref.state,
          name = _ref.name;
      // Offsets are the actual position the popper needs to have to be
      // properly positioned near its reference element
      // This is the most basic placement, and will be adjusted by
      // the modifiers in the next step
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var popperOffsets$1 = {
      name: 'popperOffsets',
      enabled: true,
      phase: 'read',
      fn: popperOffsets,
      data: {}
    };

    var unsetSides = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.

    function roundOffsetsByDPR(_ref) {
      var x = _ref.x,
          y = _ref.y;
      var win = window;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round(x * dpr) / dpr || 0,
        y: round(y * dpr) / dpr || 0
      };
    }

    function mapToStyles(_ref2) {
      var _Object$assign2;

      var popper = _ref2.popper,
          popperRect = _ref2.popperRect,
          placement = _ref2.placement,
          variation = _ref2.variation,
          offsets = _ref2.offsets,
          position = _ref2.position,
          gpuAcceleration = _ref2.gpuAcceleration,
          adaptive = _ref2.adaptive,
          roundOffsets = _ref2.roundOffsets,
          isFixed = _ref2.isFixed;
      var _offsets$x = offsets.x,
          x = _offsets$x === void 0 ? 0 : _offsets$x,
          _offsets$y = offsets.y,
          y = _offsets$y === void 0 ? 0 : _offsets$y;

      var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
        x: x,
        y: y
      }) : {
        x: x,
        y: y
      };

      x = _ref3.x;
      y = _ref3.y;
      var hasX = offsets.hasOwnProperty('x');
      var hasY = offsets.hasOwnProperty('y');
      var sideX = left;
      var sideY = top;
      var win = window;

      if (adaptive) {
        var offsetParent = getOffsetParent(popper);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';

        if (offsetParent === getWindow(popper)) {
          offsetParent = getDocumentElement(popper);

          if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
            heightProp = 'scrollHeight';
            widthProp = 'scrollWidth';
          }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


        offsetParent = offsetParent;

        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom;
          var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
          offsetParent[heightProp];
          y -= offsetY - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }

        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right;
          var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
          offsetParent[widthProp];
          x -= offsetX - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }

      var commonStyles = Object.assign({
        position: position
      }, adaptive && unsetSides);

      var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x: x,
        y: y
      }) : {
        x: x,
        y: y
      };

      x = _ref4.x;
      y = _ref4.y;

      if (gpuAcceleration) {
        var _Object$assign;

        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }

      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
    }

    function computeStyles(_ref5) {
      var state = _ref5.state,
          options = _ref5.options;
      var _options$gpuAccelerat = options.gpuAcceleration,
          gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
          _options$adaptive = options.adaptive,
          adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
          _options$roundOffsets = options.roundOffsets,
          roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration,
        isFixed: state.options.strategy === 'fixed'
      };

      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive: adaptive,
          roundOffsets: roundOffsets
        })));
      }

      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: 'absolute',
          adaptive: false,
          roundOffsets: roundOffsets
        })));
      }

      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var computeStyles$1 = {
      name: 'computeStyles',
      enabled: true,
      phase: 'beforeWrite',
      fn: computeStyles,
      data: {}
    };

    // and applies them to the HTMLElements such as popper and arrow

    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function (name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name]; // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]


        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (name) {
          var value = attributes[name];

          if (value === false) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value === true ? '' : value);
          }
        });
      });
    }

    function effect$1(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: {
          position: 'absolute'
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;

      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }

      return function () {
        Object.keys(state.elements).forEach(function (name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

          var style = styleProperties.reduce(function (style, property) {
            style[property] = '';
            return style;
          }, {}); // arrow is optional + virtual elements

          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }

          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function (attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    } // eslint-disable-next-line import/no-unused-modules


    var applyStyles$1 = {
      name: 'applyStyles',
      enabled: true,
      phase: 'write',
      fn: applyStyles,
      effect: effect$1,
      requires: ['computeStyles']
    };

    function distanceAndSkiddingToXY(placement, rects, offset) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

      var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
        placement: placement
      })) : offset,
          skidding = _ref[0],
          distance = _ref[1];

      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }

    function offset(_ref2) {
      var state = _ref2.state,
          options = _ref2.options,
          name = _ref2.name;
      var _options$offset = options.offset,
          offset = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement],
          x = _data$state$placement.x,
          y = _data$state$placement.y;

      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var offset$1 = {
      name: 'offset',
      enabled: true,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: offset
    };

    var hash$1 = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash$1[matched];
      });
    }

    var hash = {
      start: 'end',
      end: 'start'
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function (matched) {
        return hash[matched];
      });
    }

    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          placement = _options.placement,
          boundary = _options.boundary,
          rootBoundary = _options.rootBoundary,
          padding = _options.padding,
          flipVariations = _options.flipVariations,
          _options$allowedAutoP = _options.allowedAutoPlacements,
          allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
        return getVariation(placement) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function (placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
      });

      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;
      } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


      var overflows = allowedPlacements.reduce(function (acc, placement) {
        acc[placement] = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding
        })[getBasePlacement(placement)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
      });
    }

    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }

      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }

    function flip(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;

      if (state.modifiersData[name]._skip) {
        return;
      }

      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
          specifiedFallbackPlacements = options.fallbackPlacements,
          padding = options.padding,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          _options$flipVariatio = options.flipVariations,
          flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
          allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
        return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding,
          flipVariations: flipVariations,
          allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements[0];

      for (var i = 0; i < placements.length; i++) {
        var placement = placements[i];

        var _basePlacement = getBasePlacement(placement);

        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          altBoundary: altBoundary,
          padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }

        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];

        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }

        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }

        if (checks.every(function (check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }

        checksMap.set(placement, checks);
      }

      if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;

        var _loop = function _loop(_i) {
          var fittingPlacement = placements.find(function (placement) {
            var checks = checksMap.get(placement);

            if (checks) {
              return checks.slice(0, _i).every(function (check) {
                return check;
              });
            }
          });

          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };

        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);

          if (_ret === "break") break;
        }
      }

      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    } // eslint-disable-next-line import/no-unused-modules


    var flip$1 = {
      name: 'flip',
      enabled: true,
      phase: 'main',
      fn: flip,
      requiresIfExists: ['offset'],
      data: {
        _skip: false
      }
    };

    function getAltAxis(axis) {
      return axis === 'x' ? 'y' : 'x';
    }

    function within(min$1, value, max$1) {
      return max(min$1, min(value, max$1));
    }
    function withinMaxClamp(min, value, max) {
      var v = within(min, value, max);
      return v > max ? max : v;
    }

    function preventOverflow(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;
      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          padding = options.padding,
          _options$tether = options.tether,
          tether = _options$tether === void 0 ? true : _options$tether,
          _options$tetherOffset = options.tetherOffset,
          tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
        mainAxis: tetherOffsetValue,
        altAxis: tetherOffsetValue
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, tetherOffsetValue);
      var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
      var data = {
        x: 0,
        y: 0
      };

      if (!popperOffsets) {
        return;
      }

      if (checkMainAxis) {
        var _offsetModifierState$;

        var mainSide = mainAxis === 'y' ? top : left;
        var altSide = mainAxis === 'y' ? bottom : right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset = popperOffsets[mainAxis];
        var min$1 = offset + overflow[mainSide];
        var max$1 = offset - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds

        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)

        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
        var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset + maxOffset - offsetModifierValue;
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
      }

      if (checkAltAxis) {
        var _offsetModifierState$2;

        var _mainSide = mainAxis === 'x' ? top : left;

        var _altSide = mainAxis === 'x' ? bottom : right;

        var _offset = popperOffsets[altAxis];

        var _len = altAxis === 'y' ? 'height' : 'width';

        var _min = _offset + overflow[_mainSide];

        var _max = _offset - overflow[_altSide];

        var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

        var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

        var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

        var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

        var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var preventOverflow$1 = {
      name: 'preventOverflow',
      enabled: true,
      phase: 'main',
      fn: preventOverflow,
      requiresIfExists: ['offset']
    };

    var toPaddingObject = function toPaddingObject(padding, state) {
      padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    };

    function arrow(_ref) {
      var _state$modifiersData$;

      var state = _ref.state,
          name = _ref.name,
          options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? 'height' : 'width';

      if (!arrowElement || !popperOffsets) {
        return;
      }

      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === 'y' ? top : left;
      var maxProp = axis === 'y' ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
      var startDiff = popperOffsets[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
      // outside of the popper bounds

      var min = paddingObject[minProp];
      var max = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset = within(min, center, max); // Prevents breaking syntax highlighting...

      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }

    function effect(_ref2) {
      var state = _ref2.state,
          options = _ref2.options;
      var _options$element = options.element,
          arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

      if (arrowElement == null) {
        return;
      } // CSS selector


      if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);

        if (!arrowElement) {
          return;
        }
      }

      if (!contains(state.elements.popper, arrowElement)) {

        return;
      }

      state.elements.arrow = arrowElement;
    } // eslint-disable-next-line import/no-unused-modules


    var arrow$1 = {
      name: 'arrow',
      enabled: true,
      phase: 'main',
      fn: arrow,
      effect: effect,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    };

    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }

      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }

    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
      });
    }

    function hide(_ref) {
      var state = _ref.state,
          name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: 'reference'
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped
      });
    } // eslint-disable-next-line import/no-unused-modules


    var hide$1 = {
      name: 'hide',
      enabled: true,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: hide
    };

    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers
    }); // eslint-disable-next-line import/no-unused-modules

    // Code derived from https://github.com/bryanmylee/svelte-popperjs/blob/master/src/index.ts
    function createPopperActions(initOptions) {
      let contentNode;
      let options = initOptions;
      let popperInstance = null;
      let referenceNode;

      const initPopper = () => {
        if (referenceNode && contentNode) {
          popperInstance = createPopper(referenceNode, contentNode, options);
        }
      };

      const deinitPopper = () => {
        if (popperInstance) {
          popperInstance.destroy();
          popperInstance = null;
        }
      };

      const referenceAction = (node) => {
        referenceNode = node;
        initPopper();
        return {
          destroy() {
            deinitPopper();
          }
        };
      };

      const contentAction = (node, contentOptions) => {
        contentNode = node;
        options = Object.assign(Object.assign({}, initOptions), contentOptions);
        initPopper();

        return {
          update(newContentOptions) {
            options = Object.assign(
              Object.assign({}, initOptions),
              newContentOptions
            );
            if (popperInstance && options) {
              popperInstance.setOptions(options);
            }
          },
          destroy() {
            deinitPopper();
          }
        };
      };

      return [referenceAction, contentAction, () => popperInstance];
    }

    const createContext = () => writable({});

    /* node_modules\sveltestrap\src\Dropdown.svelte generated by Svelte v3.55.1 */

    const { Error: Error_1$1 } = globals;
    const file$18 = "node_modules\\sveltestrap\\src\\Dropdown.svelte";

    // (127:0) {:else}
    function create_else_block$6(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);
    	let div_levels = [/*$$restProps*/ ctx[3], { class: /*classes*/ ctx[2] }];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$18, 127, 2, 3323);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[21](div);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 262144)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3],
    				(!current || dirty & /*classes*/ 4) && { class: /*classes*/ ctx[2] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[21](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$6.name,
    		type: "else",
    		source: "(127:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (123:0) {#if nav}
    function create_if_block$a(ctx) {
    	let li;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);
    	let li_levels = [/*$$restProps*/ ctx[3], { class: /*classes*/ ctx[2] }];
    	let li_data = {};

    	for (let i = 0; i < li_levels.length; i += 1) {
    		li_data = assign(li_data, li_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (default_slot) default_slot.c();
    			set_attributes(li, li_data);
    			add_location(li, file$18, 123, 2, 3232);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);

    			if (default_slot) {
    				default_slot.m(li, null);
    			}

    			/*li_binding*/ ctx[20](li);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 262144)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(li, li_data = get_spread_update(li_levels, [
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3],
    				(!current || dirty & /*classes*/ 4) && { class: /*classes*/ ctx[2] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (default_slot) default_slot.d(detaching);
    			/*li_binding*/ ctx[20](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(123:0) {#if nav}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$19(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$a, create_else_block$6];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*nav*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$3();
    		},
    		l: function claim(nodes) {
    			throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$19.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$19($$self, $$props, $$invalidate) {
    	let subItemIsActive;
    	let classes;
    	let handleToggle;

    	const omit_props_names = [
    		"class","active","autoClose","direction","dropup","group","inNavbar","isOpen","nav","setActiveFromChild","size","toggle"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Dropdown', slots, ['default']);
    	const noop = () => undefined;
    	let context = createContext();
    	setContext('dropdownContext', context);
    	const navbarContext = getContext('navbar');
    	let { class: className = '' } = $$props;
    	let { active = false } = $$props;
    	let { autoClose = true } = $$props;
    	let { direction = 'down' } = $$props;
    	let { dropup = false } = $$props;
    	let { group = false } = $$props;
    	let { inNavbar = navbarContext ? navbarContext.inNavbar : false } = $$props;
    	let { isOpen = false } = $$props;
    	let { nav = false } = $$props;
    	let { setActiveFromChild = false } = $$props;
    	let { size = '' } = $$props;
    	let { toggle = undefined } = $$props;
    	const [popperRef, popperContent] = createPopperActions();
    	const validDirections = ['up', 'down', 'left', 'right', 'start', 'end'];

    	if (validDirections.indexOf(direction) === -1) {
    		throw new Error(`Invalid direction sent: '${direction}' is not one of 'up', 'down', 'left', 'right', 'start', 'end'`);
    	}

    	let component;
    	let dropdownDirection;

    	function handleDocumentClick(e) {
    		if (e && (e.which === 3 || e.type === 'keyup' && e.which !== 9)) return;

    		if (component.contains(e.target) && component !== e.target && (e.type !== 'keyup' || e.which === 9)) {
    			return;
    		}

    		if (autoClose === true || autoClose === 'inside') {
    			handleToggle(e);
    		}
    	}

    	onDestroy(() => {
    		if (typeof document !== 'undefined') {
    			['click', 'touchstart', 'keyup'].forEach(event => document.removeEventListener(event, handleDocumentClick, true));
    		}
    	});

    	function li_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			component = $$value;
    			$$invalidate(1, component);
    		});
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			component = $$value;
    			$$invalidate(1, component);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(5, className = $$new_props.class);
    		if ('active' in $$new_props) $$invalidate(6, active = $$new_props.active);
    		if ('autoClose' in $$new_props) $$invalidate(7, autoClose = $$new_props.autoClose);
    		if ('direction' in $$new_props) $$invalidate(8, direction = $$new_props.direction);
    		if ('dropup' in $$new_props) $$invalidate(9, dropup = $$new_props.dropup);
    		if ('group' in $$new_props) $$invalidate(10, group = $$new_props.group);
    		if ('inNavbar' in $$new_props) $$invalidate(11, inNavbar = $$new_props.inNavbar);
    		if ('isOpen' in $$new_props) $$invalidate(4, isOpen = $$new_props.isOpen);
    		if ('nav' in $$new_props) $$invalidate(0, nav = $$new_props.nav);
    		if ('setActiveFromChild' in $$new_props) $$invalidate(12, setActiveFromChild = $$new_props.setActiveFromChild);
    		if ('size' in $$new_props) $$invalidate(13, size = $$new_props.size);
    		if ('toggle' in $$new_props) $$invalidate(14, toggle = $$new_props.toggle);
    		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onDestroy,
    		createPopperActions,
    		classnames,
    		createContext,
    		noop,
    		context,
    		navbarContext,
    		className,
    		active,
    		autoClose,
    		direction,
    		dropup,
    		group,
    		inNavbar,
    		isOpen,
    		nav,
    		setActiveFromChild,
    		size,
    		toggle,
    		popperRef,
    		popperContent,
    		validDirections,
    		component,
    		dropdownDirection,
    		handleDocumentClick,
    		handleToggle,
    		subItemIsActive,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('context' in $$props) $$invalidate(23, context = $$new_props.context);
    		if ('className' in $$props) $$invalidate(5, className = $$new_props.className);
    		if ('active' in $$props) $$invalidate(6, active = $$new_props.active);
    		if ('autoClose' in $$props) $$invalidate(7, autoClose = $$new_props.autoClose);
    		if ('direction' in $$props) $$invalidate(8, direction = $$new_props.direction);
    		if ('dropup' in $$props) $$invalidate(9, dropup = $$new_props.dropup);
    		if ('group' in $$props) $$invalidate(10, group = $$new_props.group);
    		if ('inNavbar' in $$props) $$invalidate(11, inNavbar = $$new_props.inNavbar);
    		if ('isOpen' in $$props) $$invalidate(4, isOpen = $$new_props.isOpen);
    		if ('nav' in $$props) $$invalidate(0, nav = $$new_props.nav);
    		if ('setActiveFromChild' in $$props) $$invalidate(12, setActiveFromChild = $$new_props.setActiveFromChild);
    		if ('size' in $$props) $$invalidate(13, size = $$new_props.size);
    		if ('toggle' in $$props) $$invalidate(14, toggle = $$new_props.toggle);
    		if ('component' in $$props) $$invalidate(1, component = $$new_props.component);
    		if ('dropdownDirection' in $$props) $$invalidate(15, dropdownDirection = $$new_props.dropdownDirection);
    		if ('handleToggle' in $$props) $$invalidate(16, handleToggle = $$new_props.handleToggle);
    		if ('subItemIsActive' in $$props) $$invalidate(17, subItemIsActive = $$new_props.subItemIsActive);
    		if ('classes' in $$props) $$invalidate(2, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*setActiveFromChild, component*/ 4098) {
    			$$invalidate(17, subItemIsActive = !!(setActiveFromChild && component && typeof component.querySelector === 'function' && component.querySelector('.active')));
    		}

    		if ($$self.$$.dirty & /*direction*/ 256) {
    			{
    				if (direction === 'left') $$invalidate(15, dropdownDirection = 'start'); else if (direction === 'right') $$invalidate(15, dropdownDirection = 'end'); else $$invalidate(15, dropdownDirection = direction);
    			}
    		}

    		if ($$self.$$.dirty & /*toggle, isOpen*/ 16400) {
    			$$invalidate(16, handleToggle = toggle || (() => $$invalidate(4, isOpen = !isOpen)));
    		}

    		if ($$self.$$.dirty & /*className, direction, dropdownDirection, nav, active, setActiveFromChild, subItemIsActive, group, size, isOpen*/ 177521) {
    			$$invalidate(2, classes = classnames(className, direction !== 'down' && `drop${dropdownDirection}`, nav && active ? 'active' : false, setActiveFromChild && subItemIsActive ? 'active' : false, {
    				'btn-group': group,
    				[`btn-group-${size}`]: !!size,
    				dropdown: !group,
    				show: isOpen,
    				'nav-item': nav
    			}));
    		}

    		if ($$self.$$.dirty & /*isOpen*/ 16) {
    			{
    				if (typeof document !== 'undefined') {
    					if (isOpen) {
    						['click', 'touchstart', 'keyup'].forEach(event => document.addEventListener(event, handleDocumentClick, true));
    					} else {
    						['click', 'touchstart', 'keyup'].forEach(event => document.removeEventListener(event, handleDocumentClick, true));
    					}
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*handleToggle, isOpen, autoClose, direction, dropup, nav, inNavbar*/ 68497) {
    			{
    				context.update(() => {
    					return {
    						toggle: handleToggle,
    						isOpen,
    						autoClose,
    						direction: direction === 'down' && dropup ? 'up' : direction,
    						inNavbar: nav || inNavbar,
    						popperRef: nav ? noop : popperRef,
    						popperContent: nav ? noop : popperContent
    					};
    				});
    			}
    		}
    	};

    	return [
    		nav,
    		component,
    		classes,
    		$$restProps,
    		isOpen,
    		className,
    		active,
    		autoClose,
    		direction,
    		dropup,
    		group,
    		inNavbar,
    		setActiveFromChild,
    		size,
    		toggle,
    		dropdownDirection,
    		handleToggle,
    		subItemIsActive,
    		$$scope,
    		slots,
    		li_binding,
    		div_binding
    	];
    }

    class Dropdown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$19, create_fragment$19, safe_not_equal, {
    			class: 5,
    			active: 6,
    			autoClose: 7,
    			direction: 8,
    			dropup: 9,
    			group: 10,
    			inNavbar: 11,
    			isOpen: 4,
    			nav: 0,
    			setActiveFromChild: 12,
    			size: 13,
    			toggle: 14
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dropdown",
    			options,
    			id: create_fragment$19.name
    		});
    	}

    	get class() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autoClose() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autoClose(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get direction() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set direction(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dropup() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dropup(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get group() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set group(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inNavbar() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inNavbar(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nav() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nav(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setActiveFromChild() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set setActiveFromChild(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get toggle() {
    		throw new Error_1$1("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set toggle(value) {
    		throw new Error_1$1("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Container.svelte generated by Svelte v3.55.1 */
    const file$17 = "node_modules\\sveltestrap\\src\\Container.svelte";

    function create_fragment$18(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);
    	let div_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$17, 23, 0, 542);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 512)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
    				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$18.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$18($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","sm","md","lg","xl","xxl","fluid"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Container', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { sm = undefined } = $$props;
    	let { md = undefined } = $$props;
    	let { lg = undefined } = $$props;
    	let { xl = undefined } = $$props;
    	let { xxl = undefined } = $$props;
    	let { fluid = false } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('sm' in $$new_props) $$invalidate(3, sm = $$new_props.sm);
    		if ('md' in $$new_props) $$invalidate(4, md = $$new_props.md);
    		if ('lg' in $$new_props) $$invalidate(5, lg = $$new_props.lg);
    		if ('xl' in $$new_props) $$invalidate(6, xl = $$new_props.xl);
    		if ('xxl' in $$new_props) $$invalidate(7, xxl = $$new_props.xxl);
    		if ('fluid' in $$new_props) $$invalidate(8, fluid = $$new_props.fluid);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		sm,
    		md,
    		lg,
    		xl,
    		xxl,
    		fluid,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('sm' in $$props) $$invalidate(3, sm = $$new_props.sm);
    		if ('md' in $$props) $$invalidate(4, md = $$new_props.md);
    		if ('lg' in $$props) $$invalidate(5, lg = $$new_props.lg);
    		if ('xl' in $$props) $$invalidate(6, xl = $$new_props.xl);
    		if ('xxl' in $$props) $$invalidate(7, xxl = $$new_props.xxl);
    		if ('fluid' in $$props) $$invalidate(8, fluid = $$new_props.fluid);
    		if ('classes' in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, sm, md, lg, xl, xxl, fluid*/ 508) {
    			$$invalidate(0, classes = classnames(className, {
    				'container-sm': sm,
    				'container-md': md,
    				'container-lg': lg,
    				'container-xl': xl,
    				'container-xxl': xxl,
    				'container-fluid': fluid,
    				container: !sm && !md && !lg && !xl && !xxl && !fluid
    			}));
    		}
    	};

    	return [classes, $$restProps, className, sm, md, lg, xl, xxl, fluid, $$scope, slots];
    }

    class Container extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$18, create_fragment$18, safe_not_equal, {
    			class: 2,
    			sm: 3,
    			md: 4,
    			lg: 5,
    			xl: 6,
    			xxl: 7,
    			fluid: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Container",
    			options,
    			id: create_fragment$18.name
    		});
    	}

    	get class() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sm() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sm(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get md() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set md(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lg() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lg(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xl() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xl(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xxl() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xxl(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fluid() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fluid(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\DropdownItem.svelte generated by Svelte v3.55.1 */
    const file$16 = "node_modules\\sveltestrap\\src\\DropdownItem.svelte";

    // (49:0) {:else}
    function create_else_block$5(ctx) {
    	let button;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);
    	let button_levels = [{ type: "button" }, /*$$restProps*/ ctx[6], { class: /*classes*/ ctx[3] }];
    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			set_attributes(button, button_data);
    			add_location(button, file$16, 49, 2, 1155);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			if (button.autofocus) button.focus();
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", /*click_handler_2*/ ctx[15], false, false, false),
    					listen_dev(button, "click", /*handleItemClick*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [
    				{ type: "button" },
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6],
    				(!current || dirty & /*classes*/ 8) && { class: /*classes*/ ctx[3] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(49:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (45:15) 
    function create_if_block_2$3(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	let a_levels = [
    		/*$$restProps*/ ctx[6],
    		{ click: "" },
    		{ href: /*href*/ ctx[2] },
    		{ class: /*classes*/ ctx[3] }
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$16, 45, 2, 1048);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*handleItemClick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6],
    				{ click: "" },
    				(!current || dirty & /*href*/ 4) && { href: /*href*/ ctx[2] },
    				(!current || dirty & /*classes*/ 8) && { class: /*classes*/ ctx[3] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(45:15) ",
    		ctx
    	});

    	return block;
    }

    // (41:18) 
    function create_if_block_1$4(ctx) {
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);
    	let div_levels = [/*$$restProps*/ ctx[6], { class: /*classes*/ ctx[3] }];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$16, 41, 2, 933);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", /*click_handler_1*/ ctx[14], false, false, false),
    					listen_dev(div, "click", /*handleItemClick*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6],
    				(!current || dirty & /*classes*/ 8) && { class: /*classes*/ ctx[3] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(41:18) ",
    		ctx
    	});

    	return block;
    }

    // (37:0) {#if header}
    function create_if_block$9(ctx) {
    	let h6;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);
    	let h6_levels = [/*$$restProps*/ ctx[6], { class: /*classes*/ ctx[3] }];
    	let h6_data = {};

    	for (let i = 0; i < h6_levels.length; i += 1) {
    		h6_data = assign(h6_data, h6_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			h6 = element("h6");
    			if (default_slot) default_slot.c();
    			set_attributes(h6, h6_data);
    			add_location(h6, file$16, 37, 2, 817);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h6, anchor);

    			if (default_slot) {
    				default_slot.m(h6, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(h6, "click", /*click_handler*/ ctx[13], false, false, false),
    					listen_dev(h6, "click", /*handleItemClick*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(h6, h6_data = get_spread_update(h6_levels, [
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6],
    				(!current || dirty & /*classes*/ 8) && { class: /*classes*/ ctx[3] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h6);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(37:0) {#if header}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$17(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$9, create_if_block_1$4, create_if_block_2$3, create_else_block$5];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*header*/ ctx[1]) return 0;
    		if (/*divider*/ ctx[0]) return 1;
    		if (/*href*/ ctx[2]) return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$3();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$17.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$17($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","active","disabled","divider","header","toggle","href"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $context;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DropdownItem', slots, ['default']);
    	const context = getContext('dropdownContext');
    	validate_store(context, 'context');
    	component_subscribe($$self, context, value => $$invalidate(16, $context = value));
    	let { class: className = '' } = $$props;
    	let { active = false } = $$props;
    	let { disabled = false } = $$props;
    	let { divider = false } = $$props;
    	let { header = false } = $$props;
    	let { toggle = true } = $$props;
    	let { href = '' } = $$props;

    	function handleItemClick(e) {
    		if (disabled || header || divider) {
    			e.preventDefault();
    			return;
    		}

    		if (toggle && ($context.autoClose === true || $context.autoClose === 'outside')) {
    			$context.toggle(e);
    		}
    	}

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(7, className = $$new_props.class);
    		if ('active' in $$new_props) $$invalidate(8, active = $$new_props.active);
    		if ('disabled' in $$new_props) $$invalidate(9, disabled = $$new_props.disabled);
    		if ('divider' in $$new_props) $$invalidate(0, divider = $$new_props.divider);
    		if ('header' in $$new_props) $$invalidate(1, header = $$new_props.header);
    		if ('toggle' in $$new_props) $$invalidate(10, toggle = $$new_props.toggle);
    		if ('href' in $$new_props) $$invalidate(2, href = $$new_props.href);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		classnames,
    		context,
    		className,
    		active,
    		disabled,
    		divider,
    		header,
    		toggle,
    		href,
    		handleItemClick,
    		classes,
    		$context
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(7, className = $$new_props.className);
    		if ('active' in $$props) $$invalidate(8, active = $$new_props.active);
    		if ('disabled' in $$props) $$invalidate(9, disabled = $$new_props.disabled);
    		if ('divider' in $$props) $$invalidate(0, divider = $$new_props.divider);
    		if ('header' in $$props) $$invalidate(1, header = $$new_props.header);
    		if ('toggle' in $$props) $$invalidate(10, toggle = $$new_props.toggle);
    		if ('href' in $$props) $$invalidate(2, href = $$new_props.href);
    		if ('classes' in $$props) $$invalidate(3, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, disabled, divider, header, active*/ 899) {
    			$$invalidate(3, classes = classnames(className, {
    				disabled,
    				'dropdown-item': !divider && !header,
    				active,
    				'dropdown-header': header,
    				'dropdown-divider': divider
    			}));
    		}
    	};

    	return [
    		divider,
    		header,
    		href,
    		classes,
    		context,
    		handleItemClick,
    		$$restProps,
    		className,
    		active,
    		disabled,
    		toggle,
    		$$scope,
    		slots,
    		click_handler,
    		click_handler_1,
    		click_handler_2
    	];
    }

    class DropdownItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$17, create_fragment$17, safe_not_equal, {
    			class: 7,
    			active: 8,
    			disabled: 9,
    			divider: 0,
    			header: 1,
    			toggle: 10,
    			href: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DropdownItem",
    			options,
    			id: create_fragment$17.name
    		});
    	}

    	get class() {
    		throw new Error("<DropdownItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<DropdownItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<DropdownItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<DropdownItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<DropdownItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<DropdownItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get divider() {
    		throw new Error("<DropdownItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set divider(value) {
    		throw new Error("<DropdownItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get header() {
    		throw new Error("<DropdownItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set header(value) {
    		throw new Error("<DropdownItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get toggle() {
    		throw new Error("<DropdownItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set toggle(value) {
    		throw new Error("<DropdownItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<DropdownItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<DropdownItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\DropdownMenu.svelte generated by Svelte v3.55.1 */
    const file$15 = "node_modules\\sveltestrap\\src\\DropdownMenu.svelte";

    function create_fragment$16(ctx) {
    	let div;
    	let div_data_bs_popper_value;
    	let $context_popperContent_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);

    	let div_levels = [
    		/*$$restProps*/ ctx[4],
    		{ class: /*classes*/ ctx[1] },
    		{
    			"data-bs-popper": div_data_bs_popper_value = /*$context*/ ctx[0].inNavbar ? 'static' : undefined
    		}
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$15, 41, 0, 933);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer($context_popperContent_action = /*$context*/ ctx[0].popperContent(div, /*popperOptions*/ ctx[2]));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 512)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4],
    				(!current || dirty & /*classes*/ 2) && { class: /*classes*/ ctx[1] },
    				(!current || dirty & /*$context*/ 1 && div_data_bs_popper_value !== (div_data_bs_popper_value = /*$context*/ ctx[0].inNavbar ? 'static' : undefined)) && {
    					"data-bs-popper": div_data_bs_popper_value
    				}
    			]));

    			if ($context_popperContent_action && is_function($context_popperContent_action.update) && dirty & /*popperOptions*/ 4) $context_popperContent_action.update.call(null, /*popperOptions*/ ctx[2]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$16.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$16($$self, $$props, $$invalidate) {
    	let popperOptions;
    	let classes;
    	const omit_props_names = ["class","dark","end","right"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $context;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DropdownMenu', slots, ['default']);
    	const context = getContext('dropdownContext');
    	validate_store(context, 'context');
    	component_subscribe($$self, context, value => $$invalidate(0, $context = value));
    	let { class: className = '' } = $$props;
    	let { dark = false } = $$props;
    	let { end = false } = $$props;
    	let { right = false } = $$props;

    	const popperPlacement = (direction, end) => {
    		let prefix = direction;
    		if (direction === 'up') prefix = 'top'; else if (direction === 'down') prefix = 'bottom';
    		let suffix = end ? 'end' : 'start';
    		return `${prefix}-${suffix}`;
    	};

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(5, className = $$new_props.class);
    		if ('dark' in $$new_props) $$invalidate(6, dark = $$new_props.dark);
    		if ('end' in $$new_props) $$invalidate(7, end = $$new_props.end);
    		if ('right' in $$new_props) $$invalidate(8, right = $$new_props.right);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		classnames,
    		context,
    		className,
    		dark,
    		end,
    		right,
    		popperPlacement,
    		classes,
    		popperOptions,
    		$context
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(5, className = $$new_props.className);
    		if ('dark' in $$props) $$invalidate(6, dark = $$new_props.dark);
    		if ('end' in $$props) $$invalidate(7, end = $$new_props.end);
    		if ('right' in $$props) $$invalidate(8, right = $$new_props.right);
    		if ('classes' in $$props) $$invalidate(1, classes = $$new_props.classes);
    		if ('popperOptions' in $$props) $$invalidate(2, popperOptions = $$new_props.popperOptions);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$context, end, right*/ 385) {
    			$$invalidate(2, popperOptions = {
    				modifiers: [
    					{ name: 'flip' },
    					{
    						name: 'offset',
    						options: { offset: [0, 2] }
    					}
    				],
    				placement: popperPlacement($context.direction, end || right)
    			});
    		}

    		if ($$self.$$.dirty & /*className, dark, end, right, $context*/ 481) {
    			$$invalidate(1, classes = classnames(className, 'dropdown-menu', {
    				'dropdown-menu-dark': dark,
    				'dropdown-menu-end': end || right,
    				show: $context.isOpen
    			}));
    		}
    	};

    	return [
    		$context,
    		classes,
    		popperOptions,
    		context,
    		$$restProps,
    		className,
    		dark,
    		end,
    		right,
    		$$scope,
    		slots
    	];
    }

    class DropdownMenu$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$16, create_fragment$16, safe_not_equal, { class: 5, dark: 6, end: 7, right: 8 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DropdownMenu",
    			options,
    			id: create_fragment$16.name
    		});
    	}

    	get class() {
    		throw new Error("<DropdownMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<DropdownMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dark() {
    		throw new Error("<DropdownMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dark(value) {
    		throw new Error("<DropdownMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get end() {
    		throw new Error("<DropdownMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set end(value) {
    		throw new Error("<DropdownMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get right() {
    		throw new Error("<DropdownMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set right(value) {
    		throw new Error("<DropdownMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\DropdownToggle.svelte generated by Svelte v3.55.1 */
    const file$14 = "node_modules\\sveltestrap\\src\\DropdownToggle.svelte";

    // (94:0) {:else}
    function create_else_block$4(ctx) {
    	let button;
    	let button_aria_expanded_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], null);
    	const default_slot_or_fallback = default_slot || fallback_block_3(ctx);

    	let button_levels = [
    		/*$$restProps*/ ctx[9],
    		{ type: "button" },
    		{
    			"aria-expanded": button_aria_expanded_value = /*$context*/ ctx[6].isOpen
    		},
    		{ class: /*btnClasses*/ ctx[5] }
    	];

    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			button = element("button");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			set_attributes(button, button_data);
    			add_location(button, file$14, 94, 2, 1948);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(button, null);
    			}

    			if (button.autofocus) button.focus();
    			/*button_binding*/ ctx[28](button);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*$context*/ ctx[6].popperRef(button)),
    					listen_dev(button, "click", /*click_handler_3*/ ctx[24], false, false, false),
    					listen_dev(button, "click", /*toggleButton*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 524288)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[19], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*ariaLabel*/ 2)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				{ type: "button" },
    				(!current || dirty & /*$context*/ 64 && button_aria_expanded_value !== (button_aria_expanded_value = /*$context*/ ctx[6].isOpen)) && {
    					"aria-expanded": button_aria_expanded_value
    				},
    				(!current || dirty & /*btnClasses*/ 32) && { class: /*btnClasses*/ ctx[5] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			/*button_binding*/ ctx[28](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(94:0) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (80:25) 
    function create_if_block_2$2(ctx) {
    	let span;
    	let span_aria_expanded_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], null);
    	const default_slot_or_fallback = default_slot || fallback_block_2(ctx);

    	let span_levels = [
    		/*$$restProps*/ ctx[9],
    		{
    			"aria-expanded": span_aria_expanded_value = /*$context*/ ctx[6].isOpen
    		},
    		{ class: /*classes*/ ctx[4] }
    	];

    	let span_data = {};

    	for (let i = 0; i < span_levels.length; i += 1) {
    		span_data = assign(span_data, span_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			span = element("span");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			set_attributes(span, span_data);
    			add_location(span, file$14, 80, 2, 1673);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(span, null);
    			}

    			/*span_binding*/ ctx[27](span);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*$context*/ ctx[6].popperRef(span)),
    					listen_dev(span, "click", /*click_handler_2*/ ctx[23], false, false, false),
    					listen_dev(span, "click", /*toggleButton*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 524288)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[19], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*ariaLabel*/ 2)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_attributes(span, span_data = get_spread_update(span_levels, [
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				(!current || dirty & /*$context*/ 64 && span_aria_expanded_value !== (span_aria_expanded_value = /*$context*/ ctx[6].isOpen)) && {
    					"aria-expanded": span_aria_expanded_value
    				},
    				(!current || dirty & /*classes*/ 16) && { class: /*classes*/ ctx[4] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			/*span_binding*/ ctx[27](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(80:25) ",
    		ctx
    	});

    	return block_1;
    }

    // (66:24) 
    function create_if_block_1$3(ctx) {
    	let div;
    	let div_aria_expanded_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], null);
    	const default_slot_or_fallback = default_slot || fallback_block_1(ctx);

    	let div_levels = [
    		/*$$restProps*/ ctx[9],
    		{
    			"aria-expanded": div_aria_expanded_value = /*$context*/ ctx[6].isOpen
    		},
    		{ class: /*classes*/ ctx[4] }
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			div = element("div");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			set_attributes(div, div_data);
    			add_location(div, file$14, 66, 2, 1382);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(div, null);
    			}

    			/*div_binding*/ ctx[26](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*$context*/ ctx[6].popperRef(div)),
    					listen_dev(div, "click", /*click_handler_1*/ ctx[22], false, false, false),
    					listen_dev(div, "click", /*toggleButton*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 524288)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[19], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*ariaLabel*/ 2)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				(!current || dirty & /*$context*/ 64 && div_aria_expanded_value !== (div_aria_expanded_value = /*$context*/ ctx[6].isOpen)) && { "aria-expanded": div_aria_expanded_value },
    				(!current || dirty & /*classes*/ 16) && { class: /*classes*/ ctx[4] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			/*div_binding*/ ctx[26](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(66:24) ",
    		ctx
    	});

    	return block_1;
    }

    // (51:0) {#if nav}
    function create_if_block$8(ctx) {
    	let a;
    	let a_aria_expanded_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	let a_levels = [
    		/*$$restProps*/ ctx[9],
    		{ href: "#nav" },
    		{
    			"aria-expanded": a_aria_expanded_value = /*$context*/ ctx[6].isOpen
    		},
    		{ class: /*classes*/ ctx[4] }
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			a = element("a");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			set_attributes(a, a_data);
    			add_location(a, file$14, 51, 2, 1080);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(a, null);
    			}

    			/*a_binding*/ ctx[25](a);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*$context*/ ctx[6].popperRef(a)),
    					listen_dev(a, "click", /*click_handler*/ ctx[21], false, false, false),
    					listen_dev(a, "click", /*toggleButton*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 524288)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[19], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*ariaLabel*/ 2)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				{ href: "#nav" },
    				(!current || dirty & /*$context*/ 64 && a_aria_expanded_value !== (a_aria_expanded_value = /*$context*/ ctx[6].isOpen)) && { "aria-expanded": a_aria_expanded_value },
    				(!current || dirty & /*classes*/ 16) && { class: /*classes*/ ctx[4] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			/*a_binding*/ ctx[25](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(51:0) {#if nav}",
    		ctx
    	});

    	return block_1;
    }

    // (105:10)        
    function fallback_block_3(ctx) {
    	let span;
    	let t;

    	const block_1 = {
    		c: function create() {
    			span = element("span");
    			t = text(/*ariaLabel*/ ctx[1]);
    			attr_dev(span, "class", "visually-hidden");
    			add_location(span, file$14, 105, 6, 2165);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*ariaLabel*/ 2) set_data_dev(t, /*ariaLabel*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: fallback_block_3.name,
    		type: "fallback",
    		source: "(105:10)        ",
    		ctx
    	});

    	return block_1;
    }

    // (90:10)        
    function fallback_block_2(ctx) {
    	let span;
    	let t;

    	const block_1 = {
    		c: function create() {
    			span = element("span");
    			t = text(/*ariaLabel*/ ctx[1]);
    			attr_dev(span, "class", "visually-hidden");
    			add_location(span, file$14, 90, 6, 1867);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*ariaLabel*/ 2) set_data_dev(t, /*ariaLabel*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: fallback_block_2.name,
    		type: "fallback",
    		source: "(90:10)        ",
    		ctx
    	});

    	return block_1;
    }

    // (76:10)        
    function fallback_block_1(ctx) {
    	let span;
    	let t;

    	const block_1 = {
    		c: function create() {
    			span = element("span");
    			t = text(/*ariaLabel*/ ctx[1]);
    			attr_dev(span, "class", "visually-hidden");
    			add_location(span, file$14, 76, 6, 1575);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*ariaLabel*/ 2) set_data_dev(t, /*ariaLabel*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: fallback_block_1.name,
    		type: "fallback",
    		source: "(76:10)        ",
    		ctx
    	});

    	return block_1;
    }

    // (62:10)        
    function fallback_block(ctx) {
    	let span;
    	let t;

    	const block_1 = {
    		c: function create() {
    			span = element("span");
    			t = text(/*ariaLabel*/ ctx[1]);
    			attr_dev(span, "class", "visually-hidden");
    			add_location(span, file$14, 62, 6, 1287);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*ariaLabel*/ 2) set_data_dev(t, /*ariaLabel*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(62:10)        ",
    		ctx
    	});

    	return block_1;
    }

    function create_fragment$15(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$8, create_if_block_1$3, create_if_block_2$2, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*nav*/ ctx[2]) return 0;
    		if (/*tag*/ ctx[3] === 'div') return 1;
    		if (/*tag*/ ctx[3] === 'span') return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block_1 = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$3();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_fragment$15.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block_1;
    }

    function instance$15($$self, $$props, $$invalidate) {
    	let classes;
    	let btnClasses;

    	const omit_props_names = [
    		"class","ariaLabel","active","block","caret","color","disabled","inner","nav","outline","size","split","tag"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $context;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DropdownToggle', slots, ['default']);
    	const context = getContext('dropdownContext');
    	validate_store(context, 'context');
    	component_subscribe($$self, context, value => $$invalidate(6, $context = value));
    	let { class: className = '' } = $$props;
    	let { ariaLabel = 'Toggle Dropdown' } = $$props;
    	let { active = false } = $$props;
    	let { block = false } = $$props;
    	let { caret = false } = $$props;
    	let { color = 'secondary' } = $$props;
    	let { disabled = false } = $$props;
    	let { inner = undefined } = $$props;
    	let { nav = false } = $$props;
    	let { outline = false } = $$props;
    	let { size = '' } = $$props;
    	let { split = false } = $$props;
    	let { tag = null } = $$props;

    	function toggleButton(e) {
    		if (disabled) {
    			e.preventDefault();
    			return;
    		}

    		if (nav) {
    			e.preventDefault();
    		}

    		$context.toggle(e);
    	}

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function a_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(0, inner);
    		});
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(0, inner);
    		});
    	}

    	function span_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(0, inner);
    		});
    	}

    	function button_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(0, inner);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(10, className = $$new_props.class);
    		if ('ariaLabel' in $$new_props) $$invalidate(1, ariaLabel = $$new_props.ariaLabel);
    		if ('active' in $$new_props) $$invalidate(11, active = $$new_props.active);
    		if ('block' in $$new_props) $$invalidate(12, block = $$new_props.block);
    		if ('caret' in $$new_props) $$invalidate(13, caret = $$new_props.caret);
    		if ('color' in $$new_props) $$invalidate(14, color = $$new_props.color);
    		if ('disabled' in $$new_props) $$invalidate(15, disabled = $$new_props.disabled);
    		if ('inner' in $$new_props) $$invalidate(0, inner = $$new_props.inner);
    		if ('nav' in $$new_props) $$invalidate(2, nav = $$new_props.nav);
    		if ('outline' in $$new_props) $$invalidate(16, outline = $$new_props.outline);
    		if ('size' in $$new_props) $$invalidate(17, size = $$new_props.size);
    		if ('split' in $$new_props) $$invalidate(18, split = $$new_props.split);
    		if ('tag' in $$new_props) $$invalidate(3, tag = $$new_props.tag);
    		if ('$$scope' in $$new_props) $$invalidate(19, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		classnames,
    		context,
    		className,
    		ariaLabel,
    		active,
    		block,
    		caret,
    		color,
    		disabled,
    		inner,
    		nav,
    		outline,
    		size,
    		split,
    		tag,
    		toggleButton,
    		classes,
    		btnClasses,
    		$context
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(10, className = $$new_props.className);
    		if ('ariaLabel' in $$props) $$invalidate(1, ariaLabel = $$new_props.ariaLabel);
    		if ('active' in $$props) $$invalidate(11, active = $$new_props.active);
    		if ('block' in $$props) $$invalidate(12, block = $$new_props.block);
    		if ('caret' in $$props) $$invalidate(13, caret = $$new_props.caret);
    		if ('color' in $$props) $$invalidate(14, color = $$new_props.color);
    		if ('disabled' in $$props) $$invalidate(15, disabled = $$new_props.disabled);
    		if ('inner' in $$props) $$invalidate(0, inner = $$new_props.inner);
    		if ('nav' in $$props) $$invalidate(2, nav = $$new_props.nav);
    		if ('outline' in $$props) $$invalidate(16, outline = $$new_props.outline);
    		if ('size' in $$props) $$invalidate(17, size = $$new_props.size);
    		if ('split' in $$props) $$invalidate(18, split = $$new_props.split);
    		if ('tag' in $$props) $$invalidate(3, tag = $$new_props.tag);
    		if ('classes' in $$props) $$invalidate(4, classes = $$new_props.classes);
    		if ('btnClasses' in $$props) $$invalidate(5, btnClasses = $$new_props.btnClasses);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, caret, split, nav*/ 271364) {
    			$$invalidate(4, classes = classnames(className, {
    				'dropdown-toggle': caret || split,
    				'dropdown-toggle-split': split,
    				'nav-link': nav
    			}));
    		}

    		if ($$self.$$.dirty & /*classes, outline, color, size, block, active*/ 219152) {
    			$$invalidate(5, btnClasses = classnames(classes, 'btn', `btn${outline ? '-outline' : ''}-${color}`, size ? `btn-${size}` : false, block ? 'd-block w-100' : false, { active }));
    		}
    	};

    	return [
    		inner,
    		ariaLabel,
    		nav,
    		tag,
    		classes,
    		btnClasses,
    		$context,
    		context,
    		toggleButton,
    		$$restProps,
    		className,
    		active,
    		block,
    		caret,
    		color,
    		disabled,
    		outline,
    		size,
    		split,
    		$$scope,
    		slots,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		a_binding,
    		div_binding,
    		span_binding,
    		button_binding
    	];
    }

    class DropdownToggle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$15, create_fragment$15, safe_not_equal, {
    			class: 10,
    			ariaLabel: 1,
    			active: 11,
    			block: 12,
    			caret: 13,
    			color: 14,
    			disabled: 15,
    			inner: 0,
    			nav: 2,
    			outline: 16,
    			size: 17,
    			split: 18,
    			tag: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DropdownToggle",
    			options,
    			id: create_fragment$15.name
    		});
    	}

    	get class() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabel() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabel(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get block() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set block(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get caret() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set caret(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inner() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inner(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nav() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nav(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outline() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outline(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get split() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set split(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tag() {
    		throw new Error("<DropdownToggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tag(value) {
    		throw new Error("<DropdownToggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Nav.svelte generated by Svelte v3.55.1 */
    const file$13 = "node_modules\\sveltestrap\\src\\Nav.svelte";

    function create_fragment$14(ctx) {
    	let ul;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);
    	let ul_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
    	let ul_data = {};

    	for (let i = 0; i < ul_levels.length; i += 1) {
    		ul_data = assign(ul_data, ul_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			set_attributes(ul, ul_data);
    			add_location(ul, file$13, 39, 0, 941);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(ul, ul_data = get_spread_update(ul_levels, [
    				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
    				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$14.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getVerticalClass(vertical) {
    	if (vertical === false) {
    		return false;
    	} else if (vertical === true || vertical === 'xs') {
    		return 'flex-column';
    	}

    	return `flex-${vertical}-column`;
    }

    function instance$14($$self, $$props, $$invalidate) {
    	let classes;

    	const omit_props_names = [
    		"class","tabs","pills","vertical","horizontal","justified","fill","navbar","card"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { tabs = false } = $$props;
    	let { pills = false } = $$props;
    	let { vertical = false } = $$props;
    	let { horizontal = '' } = $$props;
    	let { justified = false } = $$props;
    	let { fill = false } = $$props;
    	let { navbar = false } = $$props;
    	let { card = false } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('tabs' in $$new_props) $$invalidate(3, tabs = $$new_props.tabs);
    		if ('pills' in $$new_props) $$invalidate(4, pills = $$new_props.pills);
    		if ('vertical' in $$new_props) $$invalidate(5, vertical = $$new_props.vertical);
    		if ('horizontal' in $$new_props) $$invalidate(6, horizontal = $$new_props.horizontal);
    		if ('justified' in $$new_props) $$invalidate(7, justified = $$new_props.justified);
    		if ('fill' in $$new_props) $$invalidate(8, fill = $$new_props.fill);
    		if ('navbar' in $$new_props) $$invalidate(9, navbar = $$new_props.navbar);
    		if ('card' in $$new_props) $$invalidate(10, card = $$new_props.card);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		tabs,
    		pills,
    		vertical,
    		horizontal,
    		justified,
    		fill,
    		navbar,
    		card,
    		getVerticalClass,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('tabs' in $$props) $$invalidate(3, tabs = $$new_props.tabs);
    		if ('pills' in $$props) $$invalidate(4, pills = $$new_props.pills);
    		if ('vertical' in $$props) $$invalidate(5, vertical = $$new_props.vertical);
    		if ('horizontal' in $$props) $$invalidate(6, horizontal = $$new_props.horizontal);
    		if ('justified' in $$props) $$invalidate(7, justified = $$new_props.justified);
    		if ('fill' in $$props) $$invalidate(8, fill = $$new_props.fill);
    		if ('navbar' in $$props) $$invalidate(9, navbar = $$new_props.navbar);
    		if ('card' in $$props) $$invalidate(10, card = $$new_props.card);
    		if ('classes' in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, navbar, horizontal, vertical, tabs, card, pills, justified, fill*/ 2044) {
    			$$invalidate(0, classes = classnames(className, navbar ? 'navbar-nav' : 'nav', horizontal ? `justify-content-${horizontal}` : false, getVerticalClass(vertical), {
    				'nav-tabs': tabs,
    				'card-header-tabs': card && tabs,
    				'nav-pills': pills,
    				'card-header-pills': card && pills,
    				'nav-justified': justified,
    				'nav-fill': fill
    			}));
    		}
    	};

    	return [
    		classes,
    		$$restProps,
    		className,
    		tabs,
    		pills,
    		vertical,
    		horizontal,
    		justified,
    		fill,
    		navbar,
    		card,
    		$$scope,
    		slots
    	];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$14, create_fragment$14, safe_not_equal, {
    			class: 2,
    			tabs: 3,
    			pills: 4,
    			vertical: 5,
    			horizontal: 6,
    			justified: 7,
    			fill: 8,
    			navbar: 9,
    			card: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$14.name
    		});
    	}

    	get class() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabs() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabs(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pills() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pills(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get vertical() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set vertical(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get horizontal() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set horizontal(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get justified() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set justified(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fill() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fill(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get navbar() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set navbar(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get card() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set card(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Navbar.svelte generated by Svelte v3.55.1 */
    const file$12 = "node_modules\\sveltestrap\\src\\Navbar.svelte";

    // (44:2) {:else}
    function create_else_block$3(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(44:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (40:2) {#if container}
    function create_if_block$7(ctx) {
    	let container_1;
    	let current;

    	container_1 = new Container({
    			props: {
    				fluid: /*container*/ ctx[0] === 'fluid',
    				$$slots: { default: [create_default_slot$D] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(container_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(container_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const container_1_changes = {};
    			if (dirty & /*container*/ 1) container_1_changes.fluid = /*container*/ ctx[0] === 'fluid';

    			if (dirty & /*$$scope*/ 2048) {
    				container_1_changes.$$scope = { dirty, ctx };
    			}

    			container_1.$set(container_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(container_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(40:2) {#if container}",
    		ctx
    	});

    	return block;
    }

    // (41:4) <Container fluid={container === 'fluid'}>
    function create_default_slot$D(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$D.name,
    		type: "slot",
    		source: "(41:4) <Container fluid={container === 'fluid'}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$13(ctx) {
    	let nav;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$7, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*container*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let nav_levels = [/*$$restProps*/ ctx[2], { class: /*classes*/ ctx[1] }];
    	let nav_data = {};

    	for (let i = 0; i < nav_levels.length; i += 1) {
    		nav_data = assign(nav_data, nav_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			if_block.c();
    			set_attributes(nav, nav_data);
    			add_location(nav, file$12, 38, 0, 889);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			if_blocks[current_block_type_index].m(nav, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(nav, null);
    			}

    			set_attributes(nav, nav_data = get_spread_update(nav_levels, [
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2],
    				(!current || dirty & /*classes*/ 2) && { class: /*classes*/ ctx[1] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$13.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getExpandClass(expand) {
    	if (expand === false) {
    		return false;
    	} else if (expand === true || expand === 'xs') {
    		return 'navbar-expand';
    	}

    	return `navbar-expand-${expand}`;
    }

    function instance$13($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","container","color","dark","expand","fixed","light","sticky"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, ['default']);
    	setContext('navbar', { inNavbar: true });
    	let { class: className = '' } = $$props;
    	let { container = 'fluid' } = $$props;
    	let { color = '' } = $$props;
    	let { dark = false } = $$props;
    	let { expand = '' } = $$props;
    	let { fixed = '' } = $$props;
    	let { light = false } = $$props;
    	let { sticky = '' } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('container' in $$new_props) $$invalidate(0, container = $$new_props.container);
    		if ('color' in $$new_props) $$invalidate(4, color = $$new_props.color);
    		if ('dark' in $$new_props) $$invalidate(5, dark = $$new_props.dark);
    		if ('expand' in $$new_props) $$invalidate(6, expand = $$new_props.expand);
    		if ('fixed' in $$new_props) $$invalidate(7, fixed = $$new_props.fixed);
    		if ('light' in $$new_props) $$invalidate(8, light = $$new_props.light);
    		if ('sticky' in $$new_props) $$invalidate(9, sticky = $$new_props.sticky);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		Container,
    		setContext,
    		className,
    		container,
    		color,
    		dark,
    		expand,
    		fixed,
    		light,
    		sticky,
    		getExpandClass,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('container' in $$props) $$invalidate(0, container = $$new_props.container);
    		if ('color' in $$props) $$invalidate(4, color = $$new_props.color);
    		if ('dark' in $$props) $$invalidate(5, dark = $$new_props.dark);
    		if ('expand' in $$props) $$invalidate(6, expand = $$new_props.expand);
    		if ('fixed' in $$props) $$invalidate(7, fixed = $$new_props.fixed);
    		if ('light' in $$props) $$invalidate(8, light = $$new_props.light);
    		if ('sticky' in $$props) $$invalidate(9, sticky = $$new_props.sticky);
    		if ('classes' in $$props) $$invalidate(1, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, expand, light, dark, color, fixed, sticky*/ 1016) {
    			$$invalidate(1, classes = classnames(className, 'navbar', getExpandClass(expand), {
    				'navbar-light': light,
    				'navbar-dark': dark,
    				[`bg-${color}`]: color,
    				[`fixed-${fixed}`]: fixed,
    				[`sticky-${sticky}`]: sticky
    			}));
    		}
    	};

    	return [
    		container,
    		classes,
    		$$restProps,
    		className,
    		color,
    		dark,
    		expand,
    		fixed,
    		light,
    		sticky,
    		slots,
    		$$scope
    	];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$13, create_fragment$13, safe_not_equal, {
    			class: 3,
    			container: 0,
    			color: 4,
    			dark: 5,
    			expand: 6,
    			fixed: 7,
    			light: 8,
    			sticky: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$13.name
    		});
    	}

    	get class() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get container() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set container(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dark() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dark(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get expand() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set expand(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fixed() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fixed(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get light() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sticky() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sticky(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\NavItem.svelte generated by Svelte v3.55.1 */
    const file$11 = "node_modules\\sveltestrap\\src\\NavItem.svelte";

    function create_fragment$12(ctx) {
    	let li;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);
    	let li_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
    	let li_data = {};

    	for (let i = 0; i < li_levels.length; i += 1) {
    		li_data = assign(li_data, li_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (default_slot) default_slot.c();
    			set_attributes(li, li_data);
    			add_location(li, file$11, 10, 0, 219);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);

    			if (default_slot) {
    				default_slot.m(li, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(li, li_data = get_spread_update(li_levels, [
    				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
    				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$12.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$12($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","active"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavItem', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { active = false } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('active' in $$new_props) $$invalidate(3, active = $$new_props.active);
    		if ('$$scope' in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ classnames, className, active, classes });

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('active' in $$props) $$invalidate(3, active = $$new_props.active);
    		if ('classes' in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, active*/ 12) {
    			$$invalidate(0, classes = classnames(className, 'nav-item', active ? 'active' : false));
    		}
    	};

    	return [classes, $$restProps, className, active, $$scope, slots];
    }

    class NavItem$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$12, create_fragment$12, safe_not_equal, { class: 2, active: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavItem",
    			options,
    			id: create_fragment$12.name
    		});
    	}

    	get class() {
    		throw new Error("<NavItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<NavItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<NavItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<NavItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\NavLink.svelte generated by Svelte v3.55.1 */
    const file$10 = "node_modules\\sveltestrap\\src\\NavLink.svelte";

    function create_fragment$11(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	let a_levels = [
    		/*$$restProps*/ ctx[3],
    		{ href: /*href*/ ctx[0] },
    		{ class: /*classes*/ ctx[1] }
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$10, 27, 0, 472);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(a, "click", /*click_handler*/ ctx[9], false, false, false),
    					listen_dev(a, "click", /*handleClick*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[7],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3],
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*classes*/ 2) && { class: /*classes*/ ctx[1] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$11.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$11($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","disabled","active","href"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavLink', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { disabled = false } = $$props;
    	let { active = false } = $$props;
    	let { href = '#' } = $$props;

    	function handleClick(e) {
    		if (disabled) {
    			e.preventDefault();
    			e.stopImmediatePropagation();
    			return;
    		}

    		if (href === '#') {
    			e.preventDefault();
    		}
    	}

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(4, className = $$new_props.class);
    		if ('disabled' in $$new_props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ('active' in $$new_props) $$invalidate(6, active = $$new_props.active);
    		if ('href' in $$new_props) $$invalidate(0, href = $$new_props.href);
    		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		disabled,
    		active,
    		href,
    		handleClick,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(4, className = $$new_props.className);
    		if ('disabled' in $$props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ('active' in $$props) $$invalidate(6, active = $$new_props.active);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('classes' in $$props) $$invalidate(1, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, disabled, active*/ 112) {
    			$$invalidate(1, classes = classnames(className, 'nav-link', { disabled, active }));
    		}
    	};

    	return [
    		href,
    		classes,
    		handleClick,
    		$$restProps,
    		className,
    		disabled,
    		active,
    		$$scope,
    		slots,
    		click_handler
    	];
    }

    class NavLink extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$11, create_fragment$11, safe_not_equal, {
    			class: 4,
    			disabled: 5,
    			active: 6,
    			href: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavLink",
    			options,
    			id: create_fragment$11.name
    		});
    	}

    	get class() {
    		throw new Error("<NavLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<NavLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<NavLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<NavLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<NavLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<NavLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<NavLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<NavLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\NavbarBrand.svelte generated by Svelte v3.55.1 */
    const file$$ = "node_modules\\sveltestrap\\src\\NavbarBrand.svelte";

    function create_fragment$10(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	let a_levels = [
    		/*$$restProps*/ ctx[2],
    		{ class: /*classes*/ ctx[1] },
    		{ href: /*href*/ ctx[0] }
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$$, 10, 0, 192);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*click_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2],
    				(!current || dirty & /*classes*/ 2) && { class: /*classes*/ ctx[1] },
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$10.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$10($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","href"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavbarBrand', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { href = '/' } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('href' in $$new_props) $$invalidate(0, href = $$new_props.href);
    		if ('$$scope' in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ classnames, className, href, classes });

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('classes' in $$props) $$invalidate(1, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className*/ 8) {
    			$$invalidate(1, classes = classnames(className, 'navbar-brand'));
    		}
    	};

    	return [href, classes, $$restProps, className, $$scope, slots, click_handler];
    }

    class NavbarBrand extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$10, create_fragment$10, safe_not_equal, { class: 3, href: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavbarBrand",
    			options,
    			id: create_fragment$10.name
    		});
    	}

    	get class() {
    		throw new Error("<NavbarBrand>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<NavbarBrand>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<NavbarBrand>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<NavbarBrand>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function tick_spring(ctx, last_value, current_value, target_value) {
        if (typeof current_value === 'number' || is_date(current_value)) {
            // @ts-ignore
            const delta = target_value - current_value;
            // @ts-ignore
            const velocity = (current_value - last_value) / (ctx.dt || 1 / 60); // guard div by 0
            const spring = ctx.opts.stiffness * delta;
            const damper = ctx.opts.damping * velocity;
            const acceleration = (spring - damper) * ctx.inv_mass;
            const d = (velocity + acceleration) * ctx.dt;
            if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
                return target_value; // settled
            }
            else {
                ctx.settled = false; // signal loop to keep ticking
                // @ts-ignore
                return is_date(current_value) ?
                    new Date(current_value.getTime() + d) : current_value + d;
            }
        }
        else if (Array.isArray(current_value)) {
            // @ts-ignore
            return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
        }
        else if (typeof current_value === 'object') {
            const next_value = {};
            for (const k in current_value) {
                // @ts-ignore
                next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
            }
            // @ts-ignore
            return next_value;
        }
        else {
            throw new Error(`Cannot spring ${typeof current_value} values`);
        }
    }
    function spring(value, opts = {}) {
        const store = writable(value);
        const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
        let last_time;
        let task;
        let current_token;
        let last_value = value;
        let target_value = value;
        let inv_mass = 1;
        let inv_mass_recovery_rate = 0;
        let cancel_task = false;
        function set(new_value, opts = {}) {
            target_value = new_value;
            const token = current_token = {};
            if (value == null || opts.hard || (spring.stiffness >= 1 && spring.damping >= 1)) {
                cancel_task = true; // cancel any running animation
                last_time = now();
                last_value = new_value;
                store.set(value = target_value);
                return Promise.resolve();
            }
            else if (opts.soft) {
                const rate = opts.soft === true ? .5 : +opts.soft;
                inv_mass_recovery_rate = 1 / (rate * 60);
                inv_mass = 0; // infinite mass, unaffected by spring forces
            }
            if (!task) {
                last_time = now();
                cancel_task = false;
                task = loop(now => {
                    if (cancel_task) {
                        cancel_task = false;
                        task = null;
                        return false;
                    }
                    inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
                    const ctx = {
                        inv_mass,
                        opts: spring,
                        settled: true,
                        dt: (now - last_time) * 60 / 1000
                    };
                    const next_value = tick_spring(ctx, last_value, value, target_value);
                    last_time = now;
                    last_value = value;
                    store.set(value = next_value);
                    if (ctx.settled) {
                        task = null;
                    }
                    return !ctx.settled;
                });
            }
            return new Promise(fulfil => {
                task.promise.then(() => {
                    if (token === current_token)
                        fulfil();
                });
            });
        }
        const spring = {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe,
            stiffness,
            damping,
            precision
        };
        return spring;
    }

    /* src\component\Navlogo.svelte generated by Svelte v3.55.1 */
    const file$_ = "src\\component\\Navlogo.svelte";

    // (29:4) <NavbarBrand href="#/" >
    function create_default_slot$C(ctx) {
    	let img;
    	let img_src_value;
    	let t0;
    	let span;

    	const block = {
    		c: function create() {
    			img = element("img");
    			t0 = space();
    			span = element("span");
    			span.textContent = "abcBank";
    			attr_dev(img, "class", "logo svelte-19v5919");
    			attr_dev(img, "alt", "logo");
    			if (!src_url_equal(img.src, img_src_value = "assets/image/icon.png")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$_, 29, 4, 778);
    			attr_dev(span, "class", "logo-text svelte-19v5919");
    			add_location(span, file$_, 30, 4, 843);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$C.name,
    		type: "slot",
    		source: "(29:4) <NavbarBrand href=\\\"#/\\\" >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$$(ctx) {
    	let div;
    	let navbarbrand;
    	let current;
    	let mounted;
    	let dispose;

    	navbarbrand = new NavbarBrand({
    			props: {
    				href: "#/",
    				$$slots: { default: [create_default_slot$C] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navbarbrand.$$.fragment);
    			attr_dev(div, "class", "NavLogo");
    			attr_dev(div, "style", /*LogoStyle*/ ctx[0]);
    			add_location(div, file$_, 27, 0, 675);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(navbarbrand, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "mouseenter", /*LogoHovered*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const navbarbrand_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				navbarbrand_changes.$$scope = { dirty, ctx };
    			}

    			navbarbrand.$set(navbarbrand_changes);

    			if (!current || dirty & /*LogoStyle*/ 1) {
    				attr_dev(div, "style", /*LogoStyle*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbarbrand.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbarbrand.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(navbarbrand);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$$.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$$($$self, $$props, $$invalidate) {
    	let LogoStyle;
    	let $springyRotation;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navlogo', slots, []);
    	let LogoHover = false;
    	let LogoRotation = 10;
    	let LogoRotateTiming = 150;
    	let springyRotation = spring(0, { stiffness: 0.1, damping: 0.15 });
    	validate_store(springyRotation, 'springyRotation');
    	component_subscribe($$self, springyRotation, value => $$invalidate(4, $springyRotation = value));

    	function LogoHovered() {
    		$$invalidate(3, LogoHover = true);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navlogo> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		NavbarBrand,
    		spring,
    		LogoHover,
    		LogoRotation,
    		LogoRotateTiming,
    		springyRotation,
    		LogoHovered,
    		LogoStyle,
    		$springyRotation
    	});

    	$$self.$inject_state = $$props => {
    		if ('LogoHover' in $$props) $$invalidate(3, LogoHover = $$props.LogoHover);
    		if ('LogoRotation' in $$props) $$invalidate(5, LogoRotation = $$props.LogoRotation);
    		if ('LogoRotateTiming' in $$props) $$invalidate(6, LogoRotateTiming = $$props.LogoRotateTiming);
    		if ('springyRotation' in $$props) $$invalidate(1, springyRotation = $$props.springyRotation);
    		if ('LogoStyle' in $$props) $$invalidate(0, LogoStyle = $$props.LogoStyle);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*LogoHover*/ 8) {
    			if (LogoHover) {
    				window.setTimeout(
    					() => {
    						$$invalidate(3, LogoHover = false);
    					},
    					LogoRotateTiming
    				);
    			}
    		}

    		if ($$self.$$.dirty & /*LogoHover*/ 8) {
    			springyRotation.set(LogoHover ? LogoRotation : 0);
    		}

    		if ($$self.$$.dirty & /*$springyRotation*/ 16) {
    			$$invalidate(0, LogoStyle = `
          transform: rotate(${$springyRotation}deg)
      `);
    		}
    	};

    	return [LogoStyle, springyRotation, LogoHovered, LogoHover, $springyRotation];
    }

    class Navlogo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$$, create_fragment$$, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navlogo",
    			options,
    			id: create_fragment$$.name
    		});
    	}
    }

    // Material Design Icons v7.1.96
    var mdiCheckBold = "M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z";
    var mdiCodeBrackets = "M15,4V6H18V18H15V20H20V4M4,4V20H9V18H6V6H9V4H4Z";
    var mdiLeafMaple = "M21.79,13L16,16L17,18L13,17.25V21H11V17.25L7,18L8,16L2.21,13L3.21,11.27L1.61,8L5.21,7.77L6.21,6L9.63,9.9L8,5H10L12,2L14,5H16L14.37,9.9L17.79,6L18.79,7.73L22.39,7.96L20.79,11.19L21.79,13Z";
    var mdiSnowflake = "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z";
    var mdiSprout = "M2,22V20C2,20 7,18 12,18C17,18 22,20 22,20V22H2M11.3,9.1C10.1,5.2 4,6.1 4,6.1C4,6.1 4.2,13.9 9.9,12.7C9.5,9.8 8,9 8,9C10.8,9 11,12.4 11,12.4V17C11.3,17 11.7,17 12,17C12.3,17 12.7,17 13,17V12.8C13,12.8 13,8.9 16,7.9C16,7.9 14,10.9 14,12.9C21,13.6 21,4 21,4C21,4 12.1,3 11.3,9.1Z";
    var mdiWaves = "M20,12H22V14H20C18.62,14 17.26,13.65 16,13C13.5,14.3 10.5,14.3 8,13C6.74,13.65 5.37,14 4,14H2V12H4C5.39,12 6.78,11.53 8,10.67C10.44,12.38 13.56,12.38 16,10.67C17.22,11.53 18.61,12 20,12M20,6H22V8H20C18.62,8 17.26,7.65 16,7C13.5,8.3 10.5,8.3 8,7C6.74,7.65 5.37,8 4,8H2V6H4C5.39,6 6.78,5.53 8,4.67C10.44,6.38 13.56,6.38 16,4.67C17.22,5.53 18.61,6 20,6M20,18H22V20H20C18.62,20 17.26,19.65 16,19C13.5,20.3 10.5,20.3 8,19C6.74,19.65 5.37,20 4,20H2V18H4C5.39,18 6.78,17.53 8,16.67C10.44,18.38 13.56,18.38 16,16.67C17.22,17.53 18.61,18 20,18Z";

    /* src\component\Dropdown\NavItem.svelte generated by Svelte v3.55.1 */

    const file$Z = "src\\component\\Dropdown\\NavItem.svelte";
    const get_trigger_slot_changes = dirty => ({});
    const get_trigger_slot_context = ctx => ({});

    // (31:6) {#if open}
    function create_if_block$6(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(31:6) {#if open}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$_(ctx) {
    	let li;
    	let div;
    	let t_1;
    	let current;
    	let mounted;
    	let dispose;
    	const trigger_slot_template = /*#slots*/ ctx[4].trigger;
    	const trigger_slot = create_slot(trigger_slot_template, ctx, /*$$scope*/ ctx[3], get_trigger_slot_context);
    	let if_block = /*open*/ ctx[0] && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			div = element("div");
    			if (trigger_slot) trigger_slot.c();
    			t_1 = space();
    			if (if_block) if_block.c();
    			add_location(div, file$Z, 26, 6, 588);
    			attr_dev(li, "class", "nav-item svelte-1e0urqi");
    			add_location(li, file$Z, 11, 2, 194);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div);

    			if (trigger_slot) {
    				trigger_slot.m(div, null);
    			}

    			append_dev(li, t_1);
    			if (if_block) if_block.m(li, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(li, "mouseenter", prevent_default(/*mouseenter_handler*/ ctx[5]), false, true, false),
    					listen_dev(li, "mouseleave", prevent_default(/*mouseleave_handler*/ ctx[6]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (trigger_slot) {
    				if (trigger_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						trigger_slot,
    						trigger_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(trigger_slot_template, /*$$scope*/ ctx[3], dirty, get_trigger_slot_changes),
    						get_trigger_slot_context
    					);
    				}
    			}

    			if (/*open*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*open*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(li, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(trigger_slot, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(trigger_slot, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (trigger_slot) trigger_slot.d(detaching);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$_.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function empty$2() {
    	
    }

    function instance$_($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavItem', slots, ['trigger','default']);
    	let open = false;
    	let open_pre = false;
    	let t;
    	let openTimerRunning = false;
    	let closeTimerRunning = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavItem> was created with unknown prop '${key}'`);
    	});

    	const mouseenter_handler = () => {
    		$$invalidate(1, open_pre = true);
    		clearTimeout(t);

    		$$invalidate(2, t = setTimeout(
    			() => {
    				$$invalidate(0, open = open_pre);
    			},
    			300
    		));
    	};

    	const mouseleave_handler = () => {
    		$$invalidate(1, open_pre = false);
    		clearTimeout(t);

    		$$invalidate(2, t = setTimeout(
    			() => {
    				$$invalidate(0, open = open_pre);
    			},
    			300
    		));
    	};

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		open,
    		open_pre,
    		t,
    		openTimerRunning,
    		closeTimerRunning,
    		empty: empty$2
    	});

    	$$self.$inject_state = $$props => {
    		if ('open' in $$props) $$invalidate(0, open = $$props.open);
    		if ('open_pre' in $$props) $$invalidate(1, open_pre = $$props.open_pre);
    		if ('t' in $$props) $$invalidate(2, t = $$props.t);
    		if ('openTimerRunning' in $$props) openTimerRunning = $$props.openTimerRunning;
    		if ('closeTimerRunning' in $$props) closeTimerRunning = $$props.closeTimerRunning;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [open, open_pre, t, $$scope, slots, mouseenter_handler, mouseleave_handler];
    }

    class NavItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$_, create_fragment$_, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavItem",
    			options,
    			id: create_fragment$_.name
    		});
    	}
    }

    /* src\component\Dropdown\DropdownMenu.svelte generated by Svelte v3.55.1 */
    const file$Y = "src\\component\\Dropdown\\DropdownMenu.svelte";

    function create_fragment$Z(ctx) {
    	let div1;
    	let div0;
    	let div0_intro;
    	let div0_outro;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "menu svelte-1paavjg");
    			add_location(div0, file$Y, 11, 4, 252);
    			attr_dev(div1, "class", "dropdown stack svelte-1paavjg");
    			set_style(div1, "height", /*menuHeight*/ ctx[1] + "px");
    			add_location(div1, file$Y, 10, 0, 187);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			/*div0_binding*/ ctx[4](div0);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*menuHeight*/ 2) {
    				set_style(div1, "height", /*menuHeight*/ ctx[1] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			add_render_callback(() => {
    				if (div0_outro) div0_outro.end(1);
    				div0_intro = create_in_transition(div0, fly, { x: -300 });
    				div0_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (div0_intro) div0_intro.invalidate();
    			div0_outro = create_out_transition(div0, fly, { x: -300 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			/*div0_binding*/ ctx[4](null);
    			if (detaching && div0_outro) div0_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$Z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$Z($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DropdownMenu', slots, ['default']);
    	let activeMenu = 'main';
    	let menuHeight = 0;
    	let menuEl = null;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DropdownMenu> was created with unknown prop '${key}'`);
    	});

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			menuEl = $$value;
    			$$invalidate(0, menuEl);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ fly, activeMenu, menuHeight, menuEl });

    	$$self.$inject_state = $$props => {
    		if ('activeMenu' in $$props) activeMenu = $$props.activeMenu;
    		if ('menuHeight' in $$props) $$invalidate(1, menuHeight = $$props.menuHeight);
    		if ('menuEl' in $$props) $$invalidate(0, menuEl = $$props.menuEl);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*menuEl*/ 1) {
    			$$invalidate(1, menuHeight = menuEl?.offsetHeight ?? 0);
    		}
    	};

    	return [menuEl, menuHeight, $$scope, slots, div0_binding];
    }

    class DropdownMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$Z, create_fragment$Z, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DropdownMenu",
    			options,
    			id: create_fragment$Z.name
    		});
    	}
    }

    /* src\component\Dropdown\Icon.svelte generated by Svelte v3.55.1 */

    const file$X = "src\\component\\Dropdown\\Icon.svelte";

    function create_fragment$Y(ctx) {
    	let svg;
    	let path_1;
    	let svg_class_value;
    	let svg_style_value;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path_1 = svg_element("path");
    			attr_dev(path_1, "d", /*path*/ ctx[4]);
    			attr_dev(path_1, "fill", /*color*/ ctx[2]);
    			add_location(path_1, file$X, 16, 4, 339);
    			attr_dev(svg, "width", /*width*/ ctx[0]);
    			attr_dev(svg, "height", /*height*/ ctx[1]);
    			attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			attr_dev(svg, "class", svg_class_value = "" + (null_to_empty(/*$$props*/ ctx[5].class) + " svelte-113u7g9"));
    			attr_dev(svg, "style", svg_style_value = /*$$props*/ ctx[5].style);
    			add_location(svg, file$X, 9, 2, 228);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path_1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*path*/ 16) {
    				attr_dev(path_1, "d", /*path*/ ctx[4]);
    			}

    			if (dirty & /*color*/ 4) {
    				attr_dev(path_1, "fill", /*color*/ ctx[2]);
    			}

    			if (dirty & /*width*/ 1) {
    				attr_dev(svg, "width", /*width*/ ctx[0]);
    			}

    			if (dirty & /*height*/ 2) {
    				attr_dev(svg, "height", /*height*/ ctx[1]);
    			}

    			if (dirty & /*viewBox*/ 8) {
    				attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			}

    			if (dirty & /*$$props*/ 32 && svg_class_value !== (svg_class_value = "" + (null_to_empty(/*$$props*/ ctx[5].class) + " svelte-113u7g9"))) {
    				attr_dev(svg, "class", svg_class_value);
    			}

    			if (dirty & /*$$props*/ 32 && svg_style_value !== (svg_style_value = /*$$props*/ ctx[5].style)) {
    				attr_dev(svg, "style", svg_style_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$Y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$Y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon', slots, []);
    	let { size = '1.5em' } = $$props;
    	let { width = size } = $$props;
    	let { height = size } = $$props;
    	let { color = 'currentColor' } = $$props;
    	let { viewBox = '0 0 24 24' } = $$props;
    	let { path = '' } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('size' in $$new_props) $$invalidate(6, size = $$new_props.size);
    		if ('width' in $$new_props) $$invalidate(0, width = $$new_props.width);
    		if ('height' in $$new_props) $$invalidate(1, height = $$new_props.height);
    		if ('color' in $$new_props) $$invalidate(2, color = $$new_props.color);
    		if ('viewBox' in $$new_props) $$invalidate(3, viewBox = $$new_props.viewBox);
    		if ('path' in $$new_props) $$invalidate(4, path = $$new_props.path);
    	};

    	$$self.$capture_state = () => ({
    		size,
    		width,
    		height,
    		color,
    		viewBox,
    		path
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(6, size = $$new_props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$new_props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$new_props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$new_props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$new_props.viewBox);
    		if ('path' in $$props) $$invalidate(4, path = $$new_props.path);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [width, height, color, viewBox, path, $$props, size];
    }

    class Icon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$Y, create_fragment$Y, safe_not_equal, {
    			size: 6,
    			width: 0,
    			height: 1,
    			color: 2,
    			viewBox: 3,
    			path: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options,
    			id: create_fragment$Y.name
    		});
    	}

    	get size() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get viewBox() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewBox(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get path() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Dropdown\IconButton.svelte generated by Svelte v3.55.1 */
    const file$W = "src\\component\\Dropdown\\IconButton.svelte";

    function create_fragment$X(ctx) {
    	let div;
    	let icon;
    	let current;
    	let mounted;
    	let dispose;

    	icon = new Icon({
    			props: { path: /*path*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(icon.$$.fragment);
    			attr_dev(div, "class", "icon-button svelte-19i6gau");
    			add_location(div, file$W, 9, 0, 118);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(icon, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", prevent_default(/*click_handler*/ ctx[1]), false, true, false),
    					listen_dev(div, "keydown", empty$1, false, false, false),
    					listen_dev(div, "keyup", empty$1, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const icon_changes = {};
    			if (dirty & /*path*/ 1) icon_changes.path = /*path*/ ctx[0];
    			icon.$set(icon_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(icon);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$X.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function empty$1() {
    	
    }

    function instance$X($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('IconButton', slots, []);
    	let { path = '' } = $$props;
    	const writable_props = ['path'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<IconButton> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('path' in $$props) $$invalidate(0, path = $$props.path);
    	};

    	$$self.$capture_state = () => ({ Icon, path, empty: empty$1 });

    	$$self.$inject_state = $$props => {
    		if ('path' in $$props) $$invalidate(0, path = $$props.path);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [path, click_handler];
    }

    class IconButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$X, create_fragment$X, safe_not_equal, { path: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "IconButton",
    			options,
    			id: create_fragment$X.name
    		});
    	}

    	get path() {
    		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Dropdown\MenuItem.svelte generated by Svelte v3.55.1 */
    const file$V = "src\\component\\Dropdown\\MenuItem.svelte";

    // (17:1) {#if rightIcon}
    function create_if_block$5(ctx) {
    	let span;
    	let icon;
    	let current;

    	icon = new Icon({
    			props: { path: /*rightIcon*/ ctx[1] ?? '' },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(icon.$$.fragment);
    			attr_dev(span, "class", "icon-right");
    			add_location(span, file$V, 17, 2, 364);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(icon, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_changes = {};
    			if (dirty & /*rightIcon*/ 2) icon_changes.path = /*rightIcon*/ ctx[1] ?? '';
    			icon.$set(icon_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(17:1) {#if rightIcon}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$W(ctx) {
    	let div;
    	let iconbutton;
    	let t0;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;

    	iconbutton = new IconButton({
    			props: { path: /*leftIcon*/ ctx[0] ?? '' },
    			$$inline: true
    		});

    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);
    	let if_block = /*rightIcon*/ ctx[1] && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(iconbutton.$$.fragment);
    			t0 = space();
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "menu-item svelte-1ty5qil");
    			add_location(div, file$V, 11, 0, 203);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(iconbutton, div, null);
    			append_dev(div, t0);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			append_dev(div, t1);
    			if (if_block) if_block.m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", prevent_default(/*click_handler*/ ctx[4]), false, true, false),
    					listen_dev(div, "keydown", empty, false, false, false),
    					listen_dev(div, "keyup", empty, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const iconbutton_changes = {};
    			if (dirty & /*leftIcon*/ 1) iconbutton_changes.path = /*leftIcon*/ ctx[0] ?? '';
    			iconbutton.$set(iconbutton_changes);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*rightIcon*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*rightIcon*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconbutton.$$.fragment, local);
    			transition_in(default_slot, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(iconbutton.$$.fragment, local);
    			transition_out(default_slot, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(iconbutton);
    			if (default_slot) default_slot.d(detaching);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$W.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function empty() {
    	
    }

    function instance$W($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MenuItem', slots, ['default']);
    	let { leftIcon = null } = $$props;
    	let { rightIcon = null } = $$props;
    	const writable_props = ['leftIcon', 'rightIcon'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MenuItem> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('leftIcon' in $$props) $$invalidate(0, leftIcon = $$props.leftIcon);
    		if ('rightIcon' in $$props) $$invalidate(1, rightIcon = $$props.rightIcon);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Icon,
    		IconButton,
    		leftIcon,
    		rightIcon,
    		empty
    	});

    	$$self.$inject_state = $$props => {
    		if ('leftIcon' in $$props) $$invalidate(0, leftIcon = $$props.leftIcon);
    		if ('rightIcon' in $$props) $$invalidate(1, rightIcon = $$props.rightIcon);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [leftIcon, rightIcon, $$scope, slots, click_handler];
    }

    class MenuItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$W, create_fragment$W, safe_not_equal, { leftIcon: 0, rightIcon: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MenuItem",
    			options,
    			id: create_fragment$W.name
    		});
    	}

    	get leftIcon() {
    		throw new Error("<MenuItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set leftIcon(value) {
    		throw new Error("<MenuItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rightIcon() {
    		throw new Error("<MenuItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rightIcon(value) {
    		throw new Error("<MenuItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Switch\ToggleSwitch.svelte generated by Svelte v3.55.1 */

    const file$U = "src\\component\\Switch\\ToggleSwitch.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (51:0) {:else}
    function create_else_block$2(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let t0;
    	let t1;
    	let each_value = /*options*/ ctx[4];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(/*label*/ ctx[2]);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "legend");
    			attr_dev(div0, "id", `label-${/*uniqueID*/ ctx[6]}`);
    			add_location(div0, file$U, 57, 4, 1567);
    			attr_dev(div1, "role", "radiogroup");
    			attr_dev(div1, "class", "group-container svelte-ao2ii4");
    			attr_dev(div1, "aria-labelledby", `label-${/*uniqueID*/ ctx[6]}`);
    			set_style(div1, "font-size", /*fontSize*/ ctx[5] + "px");
    			attr_dev(div1, "id", `group-${/*uniqueID*/ ctx[6]}`);
    			add_location(div1, file$U, 52, 4, 1395);
    			attr_dev(div2, "class", "s s--multi svelte-ao2ii4");
    			add_location(div2, file$U, 51, 0, 1365);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 4) set_data_dev(t0, /*label*/ ctx[2]);

    			if (dirty & /*options, uniqueID, value*/ 81) {
    				each_value = /*options*/ ctx[4];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*fontSize*/ 32) {
    				set_style(div1, "font-size", /*fontSize*/ ctx[5] + "px");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(51:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:29) 
    function create_if_block_1$2(ctx) {
    	let div;
    	let span;
    	let t0;
    	let t1;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			t0 = text(/*label*/ ctx[2]);
    			t1 = space();
    			button = element("button");
    			attr_dev(span, "id", `switch-${/*uniqueID*/ ctx[6]}`);
    			add_location(span, file$U, 42, 4, 1136);
    			attr_dev(button, "role", "switch");
    			attr_dev(button, "aria-checked", /*checked*/ ctx[1]);
    			attr_dev(button, "aria-labelledby", `switch-${/*uniqueID*/ ctx[6]}`);
    			attr_dev(button, "class", "svelte-ao2ii4");
    			add_location(button, file$U, 43, 4, 1188);
    			attr_dev(div, "class", "s s--slider svelte-ao2ii4");
    			set_style(div, "font-size", /*fontSize*/ ctx[5] + "px");
    			add_location(div, file$U, 41, 0, 1074);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*handleClick*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 4) set_data_dev(t0, /*label*/ ctx[2]);

    			if (dirty & /*checked*/ 2) {
    				attr_dev(button, "aria-checked", /*checked*/ ctx[1]);
    			}

    			if (dirty & /*fontSize*/ 32) {
    				set_style(div, "font-size", /*fontSize*/ ctx[5] + "px");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(41:29) ",
    		ctx
    	});

    	return block;
    }

    // (29:0) {#if design == 'inner'}
    function create_if_block$4(ctx) {
    	let div;
    	let span0;
    	let t0;
    	let t1;
    	let button;
    	let span1;
    	let t3;
    	let span2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			t0 = text(/*label*/ ctx[2]);
    			t1 = space();
    			button = element("button");
    			span1 = element("span");
    			span1.textContent = "on";
    			t3 = space();
    			span2 = element("span");
    			span2.textContent = "off";
    			attr_dev(span0, "id", `switch-${/*uniqueID*/ ctx[6]}`);
    			attr_dev(span0, "class", "svelte-ao2ii4");
    			add_location(span0, file$U, 30, 4, 764);
    			attr_dev(span1, "class", "svelte-ao2ii4");
    			add_location(span1, file$U, 36, 12, 973);
    			attr_dev(span2, "class", "svelte-ao2ii4");
    			add_location(span2, file$U, 37, 12, 1002);
    			attr_dev(button, "role", "switch");
    			attr_dev(button, "aria-checked", /*checked*/ ctx[1]);
    			attr_dev(button, "aria-labelledby", `switch-${/*uniqueID*/ ctx[6]}`);
    			attr_dev(button, "class", "svelte-ao2ii4");
    			add_location(button, file$U, 31, 4, 816);
    			attr_dev(div, "class", "s s--inner svelte-ao2ii4");
    			add_location(div, file$U, 29, 0, 734);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, t0);
    			append_dev(div, t1);
    			append_dev(div, button);
    			append_dev(button, span1);
    			append_dev(button, t3);
    			append_dev(button, span2);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*handleClick*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 4) set_data_dev(t0, /*label*/ ctx[2]);

    			if (dirty & /*checked*/ 2) {
    				attr_dev(button, "aria-checked", /*checked*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(29:0) {#if design == 'inner'}",
    		ctx
    	});

    	return block;
    }

    // (59:8) {#each options as option}
    function create_each_block$4(ctx) {
    	let input;
    	let input_id_value;
    	let input_value_value;
    	let t0;
    	let label_1;
    	let t1_value = /*option*/ ctx[12] + "";
    	let t1;
    	let t2;
    	let label_1_for_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			t0 = space();
    			label_1 = element("label");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "id", input_id_value = `${/*option*/ ctx[12]}-${/*uniqueID*/ ctx[6]}`);
    			input.__value = input_value_value = /*option*/ ctx[12];
    			input.value = input.__value;
    			attr_dev(input, "class", "svelte-ao2ii4");
    			/*$$binding_groups*/ ctx[10][0].push(input);
    			add_location(input, file$U, 59, 12, 1674);
    			attr_dev(label_1, "for", label_1_for_value = `${/*option*/ ctx[12]}-${/*uniqueID*/ ctx[6]}`);
    			attr_dev(label_1, "class", "svelte-ao2ii4");
    			add_location(label_1, file$U, 60, 12, 1771);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			input.checked = input.__value === /*value*/ ctx[0];
    			insert_dev(target, t0, anchor);
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t1);
    			append_dev(label_1, t2);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[9]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*options*/ 16 && input_id_value !== (input_id_value = `${/*option*/ ctx[12]}-${/*uniqueID*/ ctx[6]}`)) {
    				attr_dev(input, "id", input_id_value);
    			}

    			if (dirty & /*options*/ 16 && input_value_value !== (input_value_value = /*option*/ ctx[12])) {
    				prop_dev(input, "__value", input_value_value);
    				input.value = input.__value;
    			}

    			if (dirty & /*value*/ 1) {
    				input.checked = input.__value === /*value*/ ctx[0];
    			}

    			if (dirty & /*options*/ 16 && t1_value !== (t1_value = /*option*/ ctx[12] + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*options*/ 16 && label_1_for_value !== (label_1_for_value = `${/*option*/ ctx[12]}-${/*uniqueID*/ ctx[6]}`)) {
    				attr_dev(label_1, "for", label_1_for_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*$$binding_groups*/ ctx[10][0].splice(/*$$binding_groups*/ ctx[10][0].indexOf(input), 1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(label_1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(59:8) {#each options as option}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$V(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*design*/ ctx[3] == 'inner') return create_if_block$4;
    		if (/*design*/ ctx[3] == 'slider') return create_if_block_1$2;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$3();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$V.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$V($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ToggleSwitch', slots, []);
    	let { label } = $$props;
    	let { design = 'inner label' } = $$props;
    	let { options = [] } = $$props;
    	let { fontSize = 16 } = $$props;
    	let { value = 'true' } = $$props;
    	let { checked = true } = $$props;
    	let { enableEvent = true } = $$props;
    	const uniqueID = Math.floor(Math.random() * 100);

    	function handleClick(event) {
    		if (enableEvent) {
    			const target = event.target;
    			const state = target.getAttribute('aria-checked');
    			$$invalidate(1, checked = state === 'true' ? false : true);
    			$$invalidate(0, value = checked === true ? 'true' : 'false');
    		}
    	}

    	const slugify = (str = "") => str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");

    	$$self.$$.on_mount.push(function () {
    		if (label === undefined && !('label' in $$props || $$self.$$.bound[$$self.$$.props['label']])) {
    			console.warn("<ToggleSwitch> was created without expected prop 'label'");
    		}
    	});

    	const writable_props = ['label', 'design', 'options', 'fontSize', 'value', 'checked', 'enableEvent'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ToggleSwitch> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input_change_handler() {
    		value = this.__value;
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$props => {
    		if ('label' in $$props) $$invalidate(2, label = $$props.label);
    		if ('design' in $$props) $$invalidate(3, design = $$props.design);
    		if ('options' in $$props) $$invalidate(4, options = $$props.options);
    		if ('fontSize' in $$props) $$invalidate(5, fontSize = $$props.fontSize);
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('checked' in $$props) $$invalidate(1, checked = $$props.checked);
    		if ('enableEvent' in $$props) $$invalidate(8, enableEvent = $$props.enableEvent);
    	};

    	$$self.$capture_state = () => ({
    		label,
    		design,
    		options,
    		fontSize,
    		value,
    		checked,
    		enableEvent,
    		uniqueID,
    		handleClick,
    		slugify
    	});

    	$$self.$inject_state = $$props => {
    		if ('label' in $$props) $$invalidate(2, label = $$props.label);
    		if ('design' in $$props) $$invalidate(3, design = $$props.design);
    		if ('options' in $$props) $$invalidate(4, options = $$props.options);
    		if ('fontSize' in $$props) $$invalidate(5, fontSize = $$props.fontSize);
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('checked' in $$props) $$invalidate(1, checked = $$props.checked);
    		if ('enableEvent' in $$props) $$invalidate(8, enableEvent = $$props.enableEvent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		checked,
    		label,
    		design,
    		options,
    		fontSize,
    		uniqueID,
    		handleClick,
    		enableEvent,
    		input_change_handler,
    		$$binding_groups
    	];
    }

    class ToggleSwitch extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$V, create_fragment$V, safe_not_equal, {
    			label: 2,
    			design: 3,
    			options: 4,
    			fontSize: 5,
    			value: 0,
    			checked: 1,
    			enableEvent: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ToggleSwitch",
    			options,
    			id: create_fragment$V.name
    		});
    	}

    	get label() {
    		throw new Error("<ToggleSwitch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<ToggleSwitch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get design() {
    		throw new Error("<ToggleSwitch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set design(value) {
    		throw new Error("<ToggleSwitch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<ToggleSwitch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<ToggleSwitch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fontSize() {
    		throw new Error("<ToggleSwitch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fontSize(value) {
    		throw new Error("<ToggleSwitch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<ToggleSwitch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<ToggleSwitch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<ToggleSwitch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<ToggleSwitch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get enableEvent() {
    		throw new Error("<ToggleSwitch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set enableEvent(value) {
    		throw new Error("<ToggleSwitch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\NavUISelector.svelte generated by Svelte v3.55.1 */
    const file$T = "src\\component\\NavUISelector.svelte";

    // (33:8) <MenuItem on:click={() => {              $ContextVisible = !$ContextVisible;          }} leftIcon={mdiSprout} rightIcon={""}>
    function create_default_slot_6$1(ctx) {
    	let t;
    	let toggleswitch;
    	let updating_checked;
    	let current;

    	function toggleswitch_checked_binding(value) {
    		/*toggleswitch_checked_binding*/ ctx[4](value);
    	}

    	let toggleswitch_props = {
    		label: "",
    		design: "slider",
    		fontSize: 12,
    		enableEvent: false
    	};

    	if (/*$ContextVisible*/ ctx[2] !== void 0) {
    		toggleswitch_props.checked = /*$ContextVisible*/ ctx[2];
    	}

    	toggleswitch = new ToggleSwitch({
    			props: toggleswitch_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(toggleswitch, 'checked', toggleswitch_checked_binding));

    	const block = {
    		c: function create() {
    			t = text("Context\r\n            ");
    			create_component(toggleswitch.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			mount_component(toggleswitch, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const toggleswitch_changes = {};

    			if (!updating_checked && dirty & /*$ContextVisible*/ 4) {
    				updating_checked = true;
    				toggleswitch_changes.checked = /*$ContextVisible*/ ctx[2];
    				add_flush_callback(() => updating_checked = false);
    			}

    			toggleswitch.$set(toggleswitch_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(toggleswitch.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(toggleswitch.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			destroy_component(toggleswitch, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(33:8) <MenuItem on:click={() => {              $ContextVisible = !$ContextVisible;          }} leftIcon={mdiSprout} rightIcon={\\\"\\\"}>",
    		ctx
    	});

    	return block;
    }

    // (38:8) <MenuItem on:click={() => {              SetUIStatus("Spring")              $season = "Spring"              jquery(".full-landing-image").ripples('pause');              jquery(".full-landing-image").ripples('hide');          }} leftIcon={mdiSprout} rightIcon={UIStatus["Spring"]}>
    function create_default_slot_5$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Spring");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(38:8) <MenuItem on:click={() => {              SetUIStatus(\\\"Spring\\\")              $season = \\\"Spring\\\"              jquery(\\\".full-landing-image\\\").ripples('pause');              jquery(\\\".full-landing-image\\\").ripples('hide');          }} leftIcon={mdiSprout} rightIcon={UIStatus[\\\"Spring\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (44:8) <MenuItem on:click={() => {              SetUIStatus("Summer")              $season = "Summer"              jquery(".full-landing-image").ripples('play');              jquery(".full-landing-image").ripples('show');          }} leftIcon={mdiWaves} rightIcon={UIStatus["Summer"]}>
    function create_default_slot_4$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Summer");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(44:8) <MenuItem on:click={() => {              SetUIStatus(\\\"Summer\\\")              $season = \\\"Summer\\\"              jquery(\\\".full-landing-image\\\").ripples('play');              jquery(\\\".full-landing-image\\\").ripples('show');          }} leftIcon={mdiWaves} rightIcon={UIStatus[\\\"Summer\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (50:8) <MenuItem on:click={() => {              SetUIStatus("Fall")              $season = "Fall"              jquery(".full-landing-image").ripples('pause');              jquery(".full-landing-image").ripples('hide');          }}   leftIcon={mdiLeafMaple} rightIcon={UIStatus["Fall"]}>
    function create_default_slot_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Fall");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(50:8) <MenuItem on:click={() => {              SetUIStatus(\\\"Fall\\\")              $season = \\\"Fall\\\"              jquery(\\\".full-landing-image\\\").ripples('pause');              jquery(\\\".full-landing-image\\\").ripples('hide');          }}   leftIcon={mdiLeafMaple} rightIcon={UIStatus[\\\"Fall\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (56:8) <MenuItem on:click={() => {              SetUIStatus("Winter")              $season = "Winter"              jquery(".full-landing-image").ripples('pause');              jquery(".full-landing-image").ripples('hide');          }} leftIcon={mdiSnowflake} rightIcon={UIStatus["Winter"]}>
    function create_default_slot_2$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Winter");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(56:8) <MenuItem on:click={() => {              SetUIStatus(\\\"Winter\\\")              $season = \\\"Winter\\\"              jquery(\\\".full-landing-image\\\").ripples('pause');              jquery(\\\".full-landing-image\\\").ripples('hide');          }} leftIcon={mdiSnowflake} rightIcon={UIStatus[\\\"Winter\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (32:4) <DropdownMenu>
    function create_default_slot_1$1(ctx) {
    	let menuitem0;
    	let t0;
    	let menuitem1;
    	let t1;
    	let menuitem2;
    	let t2;
    	let menuitem3;
    	let t3;
    	let menuitem4;
    	let current;

    	menuitem0 = new MenuItem({
    			props: {
    				leftIcon: mdiSprout,
    				rightIcon: "",
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem0.$on("click", /*click_handler*/ ctx[5]);

    	menuitem1 = new MenuItem({
    			props: {
    				leftIcon: mdiSprout,
    				rightIcon: /*UIStatus*/ ctx[0]["Spring"],
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem1.$on("click", /*click_handler_1*/ ctx[6]);

    	menuitem2 = new MenuItem({
    			props: {
    				leftIcon: mdiWaves,
    				rightIcon: /*UIStatus*/ ctx[0]["Summer"],
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem2.$on("click", /*click_handler_2*/ ctx[7]);

    	menuitem3 = new MenuItem({
    			props: {
    				leftIcon: mdiLeafMaple,
    				rightIcon: /*UIStatus*/ ctx[0]["Fall"],
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem3.$on("click", /*click_handler_3*/ ctx[8]);

    	menuitem4 = new MenuItem({
    			props: {
    				leftIcon: mdiSnowflake,
    				rightIcon: /*UIStatus*/ ctx[0]["Winter"],
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem4.$on("click", /*click_handler_4*/ ctx[9]);

    	const block = {
    		c: function create() {
    			create_component(menuitem0.$$.fragment);
    			t0 = space();
    			create_component(menuitem1.$$.fragment);
    			t1 = space();
    			create_component(menuitem2.$$.fragment);
    			t2 = space();
    			create_component(menuitem3.$$.fragment);
    			t3 = space();
    			create_component(menuitem4.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuitem0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(menuitem1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(menuitem2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(menuitem3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(menuitem4, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const menuitem0_changes = {};

    			if (dirty & /*$$scope, $ContextVisible*/ 2052) {
    				menuitem0_changes.$$scope = { dirty, ctx };
    			}

    			menuitem0.$set(menuitem0_changes);
    			const menuitem1_changes = {};
    			if (dirty & /*UIStatus*/ 1) menuitem1_changes.rightIcon = /*UIStatus*/ ctx[0]["Spring"];

    			if (dirty & /*$$scope*/ 2048) {
    				menuitem1_changes.$$scope = { dirty, ctx };
    			}

    			menuitem1.$set(menuitem1_changes);
    			const menuitem2_changes = {};
    			if (dirty & /*UIStatus*/ 1) menuitem2_changes.rightIcon = /*UIStatus*/ ctx[0]["Summer"];

    			if (dirty & /*$$scope*/ 2048) {
    				menuitem2_changes.$$scope = { dirty, ctx };
    			}

    			menuitem2.$set(menuitem2_changes);
    			const menuitem3_changes = {};
    			if (dirty & /*UIStatus*/ 1) menuitem3_changes.rightIcon = /*UIStatus*/ ctx[0]["Fall"];

    			if (dirty & /*$$scope*/ 2048) {
    				menuitem3_changes.$$scope = { dirty, ctx };
    			}

    			menuitem3.$set(menuitem3_changes);
    			const menuitem4_changes = {};
    			if (dirty & /*UIStatus*/ 1) menuitem4_changes.rightIcon = /*UIStatus*/ ctx[0]["Winter"];

    			if (dirty & /*$$scope*/ 2048) {
    				menuitem4_changes.$$scope = { dirty, ctx };
    			}

    			menuitem4.$set(menuitem4_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuitem0.$$.fragment, local);
    			transition_in(menuitem1.$$.fragment, local);
    			transition_in(menuitem2.$$.fragment, local);
    			transition_in(menuitem3.$$.fragment, local);
    			transition_in(menuitem4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuitem0.$$.fragment, local);
    			transition_out(menuitem1.$$.fragment, local);
    			transition_out(menuitem2.$$.fragment, local);
    			transition_out(menuitem3.$$.fragment, local);
    			transition_out(menuitem4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuitem0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(menuitem1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(menuitem2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(menuitem3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(menuitem4, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(32:4) <DropdownMenu>",
    		ctx
    	});

    	return block;
    }

    // (28:0) <NavItem>
    function create_default_slot$B(ctx) {
    	let dropdownmenu;
    	let current;

    	dropdownmenu = new DropdownMenu({
    			props: {
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(dropdownmenu.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(dropdownmenu, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const dropdownmenu_changes = {};

    			if (dirty & /*$$scope, UIStatus, $season, $ContextVisible*/ 2055) {
    				dropdownmenu_changes.$$scope = { dirty, ctx };
    			}

    			dropdownmenu.$set(dropdownmenu_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dropdownmenu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dropdownmenu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(dropdownmenu, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$B.name,
    		type: "slot",
    		source: "(28:0) <NavItem>",
    		ctx
    	});

    	return block;
    }

    // (29:4) 
    function create_trigger_slot(ctx) {
    	let span;
    	let iconbutton;
    	let current;

    	iconbutton = new IconButton({
    			props: { path: mdiCodeBrackets },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(iconbutton.$$.fragment);
    			attr_dev(span, "slot", "trigger");
    			add_location(span, file$T, 28, 4, 962);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(iconbutton, span, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(iconbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(iconbutton);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_trigger_slot.name,
    		type: "slot",
    		source: "(29:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$U(ctx) {
    	let div;
    	let navitem;
    	let div_intro;
    	let current;

    	navitem = new NavItem({
    			props: {
    				$$slots: {
    					trigger: [create_trigger_slot],
    					default: [create_default_slot$B]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navitem.$$.fragment);
    			attr_dev(div, "class", "UISelector svelte-1a6h0z7");
    			add_location(div, file$T, 26, 0, 894);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(navitem, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const navitem_changes = {};

    			if (dirty & /*$$scope, UIStatus, $season, $ContextVisible*/ 2055) {
    				navitem_changes.$$scope = { dirty, ctx };
    			}

    			navitem.$set(navitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navitem.$$.fragment, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, { delay: 500 });
    					div_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(navitem);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$U.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$U($$self, $$props, $$invalidate) {
    	let $season;
    	let $ContextVisible;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	validate_store(ContextVisible, 'ContextVisible');
    	component_subscribe($$self, ContextVisible, $$value => $$invalidate(2, $ContextVisible = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavUISelector', slots, []);
    	let SwitchStatus = $ContextVisible;
    	let UIStatus = {};

    	function SetUIStatus(UIType) {
    		for (var key in UIStatus) {
    			$$invalidate(0, UIStatus[key] = "", UIStatus);
    		}

    		$$invalidate(0, UIStatus[UIType] = mdiCheckBold, UIStatus);
    	}

    	onMount(() => {
    		$$invalidate(0, UIStatus[$season] = mdiCheckBold, UIStatus);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavUISelector> was created with unknown prop '${key}'`);
    	});

    	function toggleswitch_checked_binding(value) {
    		$ContextVisible = value;
    		ContextVisible.set($ContextVisible);
    	}

    	const click_handler = () => {
    		set_store_value(ContextVisible, $ContextVisible = !$ContextVisible, $ContextVisible);
    	};

    	const click_handler_1 = () => {
    		SetUIStatus("Spring");
    		set_store_value(season, $season = "Spring", $season);
    		jquery__default["default"](".full-landing-image").ripples('pause');
    		jquery__default["default"](".full-landing-image").ripples('hide');
    	};

    	const click_handler_2 = () => {
    		SetUIStatus("Summer");
    		set_store_value(season, $season = "Summer", $season);
    		jquery__default["default"](".full-landing-image").ripples('play');
    		jquery__default["default"](".full-landing-image").ripples('show');
    	};

    	const click_handler_3 = () => {
    		SetUIStatus("Fall");
    		set_store_value(season, $season = "Fall", $season);
    		jquery__default["default"](".full-landing-image").ripples('pause');
    		jquery__default["default"](".full-landing-image").ripples('hide');
    	};

    	const click_handler_4 = () => {
    		SetUIStatus("Winter");
    		set_store_value(season, $season = "Winter", $season);
    		jquery__default["default"](".full-landing-image").ripples('pause');
    		jquery__default["default"](".full-landing-image").ripples('hide');
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		ContextVisible,
    		season,
    		mdiSprout,
    		mdiWaves,
    		mdiSnowflake,
    		mdiLeafMaple,
    		mdiCheckBold,
    		mdiCodeBrackets,
    		NavItem,
    		DropdownMenu,
    		IconButton,
    		MenuItem,
    		jquery: jquery__default["default"],
    		onMount,
    		ToggleSwitch,
    		SwitchStatus,
    		UIStatus,
    		SetUIStatus,
    		$season,
    		$ContextVisible
    	});

    	$$self.$inject_state = $$props => {
    		if ('SwitchStatus' in $$props) SwitchStatus = $$props.SwitchStatus;
    		if ('UIStatus' in $$props) $$invalidate(0, UIStatus = $$props.UIStatus);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		UIStatus,
    		$season,
    		$ContextVisible,
    		SetUIStatus,
    		toggleswitch_checked_binding,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	];
    }

    class NavUISelector extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$U, create_fragment$U, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavUISelector",
    			options,
    			id: create_fragment$U.name
    		});
    	}
    }

    /**
     * @typedef {Object} WrappedComponent Object returned by the `wrap` method
     * @property {SvelteComponent} component - Component to load (this is always asynchronous)
     * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
     * @property {Object} [props] - Optional dictionary of static props
     * @property {Object} [userData] - Optional user data dictionary
     * @property {bool} _sveltesparouter - Internal flag; always set to true
     */

    /**
     * @callback AsyncSvelteComponent
     * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
     */

    /**
     * @callback RoutePrecondition
     * @param {RouteDetail} detail - Route detail object
     * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
     */

    /**
     * @typedef {Object} WrapOptions Options object for the call to `wrap`
     * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
     * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
     * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
     * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
     * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
     * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
     * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
     */

    /**
     * Wraps a component to enable multiple capabilities:
     * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
     * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
     * 3. Adding static props that are passed to the component
     * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
     * 
     * @param {WrapOptions} args - Arguments object
     * @returns {WrappedComponent} Wrapped component
     */
    function wrap$1(args) {
        if (!args) {
            throw Error('Parameter args is required')
        }

        // We need to have one and only one of component and asyncComponent
        // This does a "XNOR"
        if (!args.component == !args.asyncComponent) {
            throw Error('One and only one of component and asyncComponent is required')
        }

        // If the component is not async, wrap it into a function returning a Promise
        if (args.component) {
            args.asyncComponent = () => Promise.resolve(args.component);
        }

        // Parameter asyncComponent and each item of conditions must be functions
        if (typeof args.asyncComponent != 'function') {
            throw Error('Parameter asyncComponent must be a function')
        }
        if (args.conditions) {
            // Ensure it's an array
            if (!Array.isArray(args.conditions)) {
                args.conditions = [args.conditions];
            }
            for (let i = 0; i < args.conditions.length; i++) {
                if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                    throw Error('Invalid parameter conditions[' + i + ']')
                }
            }
        }

        // Check if we have a placeholder component
        if (args.loadingComponent) {
            args.asyncComponent.loading = args.loadingComponent;
            args.asyncComponent.loadingParams = args.loadingParams || undefined;
        }

        // Returns an object that contains all the functions to execute too
        // The _sveltesparouter flag is to confirm the object was created by this router
        const obj = {
            component: args.asyncComponent,
            userData: args.userData,
            conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
            props: (args.props && Object.keys(args.props).length) ? args.props : {},
            _sveltesparouter: true
        };

        return obj
    }

    function parse(str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.55.1 */

    const { Error: Error_1, Object: Object_1, console: console_1 } = globals;

    // (267:0) {:else}
    function create_else_block$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty$3();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*props*/ 4)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(267:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (260:0) {#if componentParams}
    function create_if_block$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty$3();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
    					dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(260:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$T(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$3, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$3();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$T.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(component, userData, ...conditions) {
    	// Use the new wrap method and show a deprecation warning
    	// eslint-disable-next-line no-console
    	console.warn('Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading');

    	return wrap$1({ component, userData, conditions });
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf('#/');

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: '/';

    	// Check if there's a querystring
    	const qsPosition = location.indexOf('?');

    	let querystring = '';

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	set(getLocation());

    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener('hashchange', update, false);

    	return function stop() {
    		window.removeEventListener('hashchange', update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);
    const params = writable(undefined);

    async function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	// Note: this will include scroll state in history even when restoreScrollState is false
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined
    	);

    	window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    }

    async function pop() {
    	// Execute this code when the current call stack is complete
    	await tick();

    	window.history.back();
    }

    async function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	const dest = (location.charAt(0) == '#' ? '' : '#') + location;

    	try {
    		const newState = { ...history.state };
    		delete newState['__svelte_spa_router_scrollX'];
    		delete newState['__svelte_spa_router_scrollY'];
    		window.history.replaceState(newState, undefined, dest);
    	} catch(e) {
    		// eslint-disable-next-line no-console
    		console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
    	}

    	// The method above doesn't trigger the hashchange event, so let's do that manually
    	window.dispatchEvent(new Event('hashchange'));
    }

    function link(node, opts) {
    	opts = linkOpts(opts);

    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
    		throw Error('Action "link" can only be used with <a> tags');
    	}

    	updateLink(node, opts);

    	return {
    		update(updated) {
    			updated = linkOpts(updated);
    			updateLink(node, updated);
    		}
    	};
    }

    function restoreScroll(state) {
    	// If this exists, then this is a back navigation: restore the scroll position
    	if (state) {
    		window.scrollTo(state.__svelte_spa_router_scrollX, state.__svelte_spa_router_scrollY);
    	} else {
    		// Otherwise this is a forward navigation: scroll to top
    		window.scrollTo(0, 0);
    	}
    }

    // Internal function used by the link function
    function updateLink(node, opts) {
    	let href = opts.href || node.getAttribute('href');

    	// Destination must start with '/' or '#/'
    	if (href && href.charAt(0) == '/') {
    		// Add # to the href attribute
    		href = '#' + href;
    	} else if (!href || href.length < 2 || href.slice(0, 2) != '#/') {
    		throw Error('Invalid value for "href" attribute: ' + href);
    	}

    	node.setAttribute('href', href);

    	node.addEventListener('click', event => {
    		// Prevent default anchor onclick behaviour
    		event.preventDefault();

    		if (!opts.disabled) {
    			scrollstateHistoryHandler(event.currentTarget.getAttribute('href'));
    		}
    	});
    }

    // Internal function that ensures the argument of the link action is always an object
    function linkOpts(val) {
    	if (val && typeof val == 'string') {
    		return { href: val };
    	} else {
    		return val || {};
    	}
    }

    /**
     * The handler attached to an anchor tag responsible for updating the
     * current history state with the current scroll state
     *
     * @param {string} href - Destination
     */
    function scrollstateHistoryHandler(href) {
    	// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined
    	);

    	// This will force an update as desired, but this time our scroll state will be attached
    	window.location.hash = href;
    }

    function instance$T($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes = {} } = $$props;
    	let { prefix = '' } = $$props;
    	let { restoreScrollState = false } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
     */
    		constructor(path, component) {
    			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
    				throw Error('Invalid component object');
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
    				throw Error('Invalid value for "path" argument - strings must start with / or *');
    			}

    			const { pattern, keys } = parse(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == 'object' && component._sveltesparouter === true) {
    				this.component = component.component;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    				this.props = component.props || {};
    			} else {
    				// Convert the component to a function that returns a Promise, to normalize it
    				this.component = () => Promise.resolve(component);

    				this.conditions = [];
    				this.props = {};
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, check if it matches the start of the path.
    			// If not, bail early, else remove it before we run the matching.
    			if (prefix) {
    				if (typeof prefix == 'string') {
    					if (path.startsWith(prefix)) {
    						path = path.substr(prefix.length) || '/';
    					} else {
    						return null;
    					}
    				} else if (prefix instanceof RegExp) {
    					const match = path.match(prefix);

    					if (match && match[0]) {
    						path = path.substr(match[0].length) || '/';
    					} else {
    						return null;
    					}
    				}
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				// In the match parameters, URL-decode all values
    				try {
    					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
    				} catch(e) {
    					out[this._keys[i]] = null;
    				}

    				i++;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {object} [userData] - Custom data passed by the user
     * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
     * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {boolean} Returns true if all the conditions succeeded
     */
    		async checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!await this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;
    	let props = {};

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	async function dispatchNextTick(name, detail) {
    		// Execute this code when the current call stack is complete
    		await tick();

    		dispatch(name, detail);
    	}

    	// If this is set, then that means we have popped into this var the state of our last scroll position
    	let previousScrollState = null;

    	let popStateChanged = null;

    	if (restoreScrollState) {
    		popStateChanged = event => {
    			// If this event was from our history.replaceState, event.state will contain
    			// our scroll history. Otherwise, event.state will be null (like on forward
    			// navigation)
    			if (event.state && (event.state.__svelte_spa_router_scrollY || event.state.__svelte_spa_router_scrollX)) {
    				previousScrollState = event.state;
    			} else {
    				previousScrollState = null;
    			}
    		};

    		// This is removed in the destroy() invocation below
    		window.addEventListener('popstate', popStateChanged);

    		afterUpdate(() => {
    			restoreScroll(previousScrollState);
    		});
    	}

    	// Always have the latest value of loc
    	let lastLoc = null;

    	// Current object of the component loaded
    	let componentObj = null;

    	// Handle hash change events
    	// Listen to changes in the $loc store and update the page
    	// Do not use the $: syntax because it gets triggered by too many things
    	const unsubscribeLoc = loc.subscribe(async newLoc => {
    		lastLoc = newLoc;

    		// Find a route matching the location
    		let i = 0;

    		while (i < routesList.length) {
    			const match = routesList[i].match(newLoc.location);

    			if (!match) {
    				i++;
    				continue;
    			}

    			const detail = {
    				route: routesList[i].path,
    				location: newLoc.location,
    				querystring: newLoc.querystring,
    				userData: routesList[i].userData,
    				params: match && typeof match == 'object' && Object.keys(match).length
    				? match
    				: null
    			};

    			// Check if the route can be loaded - if all conditions succeed
    			if (!await routesList[i].checkConditions(detail)) {
    				// Don't display anything
    				$$invalidate(0, component = null);

    				componentObj = null;

    				// Trigger an event to notify the user, then exit
    				dispatchNextTick('conditionsFailed', detail);

    				return;
    			}

    			// Trigger an event to alert that we're loading the route
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoading', Object.assign({}, detail));

    			// If there's a component to show while we're loading the route, display it
    			const obj = routesList[i].component;

    			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
    			if (componentObj != obj) {
    				if (obj.loading) {
    					$$invalidate(0, component = obj.loading);
    					componentObj = obj;
    					$$invalidate(1, componentParams = obj.loadingParams);
    					$$invalidate(2, props = {});

    					// Trigger the routeLoaded event for the loading component
    					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
    					dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    						component,
    						name: component.name,
    						params: componentParams
    					}));
    				} else {
    					$$invalidate(0, component = null);
    					componentObj = null;
    				}

    				// Invoke the Promise
    				const loaded = await obj();

    				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
    				if (newLoc != lastLoc) {
    					// Don't update the component, just exit
    					return;
    				}

    				// If there is a "default" property, which is used by async routes, then pick that
    				$$invalidate(0, component = loaded && loaded.default || loaded);

    				componentObj = obj;
    			}

    			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    			if (match && typeof match == 'object' && Object.keys(match).length) {
    				$$invalidate(1, componentParams = match);
    			} else {
    				$$invalidate(1, componentParams = null);
    			}

    			// Set static props, if any
    			$$invalidate(2, props = routesList[i].props);

    			// Dispatch the routeLoaded event then exit
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    				component,
    				name: component.name,
    				params: componentParams
    			})).then(() => {
    				params.set(componentParams);
    			});

    			return;
    		}

    		// If we're still here, there was no match, so show the empty component
    		$$invalidate(0, component = null);

    		componentObj = null;
    		params.set(undefined);
    	});

    	onDestroy(() => {
    		unsubscribeLoc();
    		popStateChanged && window.removeEventListener('popstate', popStateChanged);
    	});

    	const writable_props = ['routes', 'prefix', 'restoreScrollState'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	function routeEvent_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		writable,
    		derived,
    		tick,
    		_wrap: wrap$1,
    		wrap,
    		getLocation,
    		loc,
    		location,
    		querystring,
    		params,
    		push,
    		pop,
    		replace,
    		link,
    		restoreScroll,
    		updateLink,
    		linkOpts,
    		scrollstateHistoryHandler,
    		onDestroy,
    		createEventDispatcher,
    		afterUpdate,
    		parse,
    		routes,
    		prefix,
    		restoreScrollState,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		props,
    		dispatch,
    		dispatchNextTick,
    		previousScrollState,
    		popStateChanged,
    		lastLoc,
    		componentObj,
    		unsubscribeLoc
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    		if ('component' in $$props) $$invalidate(0, component = $$props.component);
    		if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    		if ('props' in $$props) $$invalidate(2, props = $$props.props);
    		if ('previousScrollState' in $$props) previousScrollState = $$props.previousScrollState;
    		if ('popStateChanged' in $$props) popStateChanged = $$props.popStateChanged;
    		if ('lastLoc' in $$props) lastLoc = $$props.lastLoc;
    		if ('componentObj' in $$props) componentObj = $$props.componentObj;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
    			// Update history.scrollRestoration depending on restoreScrollState
    			history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
    		}
    	};

    	return [
    		component,
    		componentParams,
    		props,
    		routes,
    		prefix,
    		restoreScrollState,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$T, create_fragment$T, safe_not_equal, {
    			routes: 3,
    			prefix: 4,
    			restoreScrollState: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$T.name
    		});
    	}

    	get routes() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get restoreScrollState() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set restoreScrollState(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Navbar.svelte generated by Svelte v3.55.1 */
    const file$S = "src\\component\\Navbar.svelte";

    // (92:12) <NavLink on:click={()=> {isOpen = false; push("/Profile");}}>
    function create_default_slot_17(ctx) {
    	let t_3;

    	const block = {
    		c: function create() {
    			t_3 = text("Profile");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t_3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t_3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_17.name,
    		type: "slot",
    		source: "(92:12) <NavLink on:click={()=> {isOpen = false; push(\\\"/Profile\\\");}}>",
    		ctx
    	});

    	return block;
    }

    // (91:10) <NavItem>
    function create_default_slot_16(ctx) {
    	let navlink;
    	let current;

    	navlink = new NavLink({
    			props: {
    				$$slots: { default: [create_default_slot_17] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	navlink.$on("click", /*click_handler_1*/ ctx[12]);

    	const block = {
    		c: function create() {
    			create_component(navlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(navlink, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const navlink_changes = {};

    			if (dirty & /*$$scope*/ 536870912) {
    				navlink_changes.$$scope = { dirty, ctx };
    			}

    			navlink.$set(navlink_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(navlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16.name,
    		type: "slot",
    		source: "(91:10) <NavItem>",
    		ctx
    	});

    	return block;
    }

    // (97:12) <DropdownToggle nav class="nav-link" caret on:click={() => {isOpen = false; push("/Projects");}}>
    function create_default_slot_15(ctx) {
    	let t_3;

    	const block = {
    		c: function create() {
    			t_3 = text("Projects");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t_3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t_3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15.name,
    		type: "slot",
    		source: "(97:12) <DropdownToggle nav class=\\\"nav-link\\\" caret on:click={() => {isOpen = false; push(\\\"/Projects\\\");}}>",
    		ctx
    	});

    	return block;
    }

    // (99:14) <DropdownItem on:click={()=> {isOpen = false; push("/2021/Projects");}}>
    function create_default_slot_14(ctx) {
    	let t_3;

    	const block = {
    		c: function create() {
    			t_3 = text("2021");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t_3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t_3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14.name,
    		type: "slot",
    		source: "(99:14) <DropdownItem on:click={()=> {isOpen = false; push(\\\"/2021/Projects\\\");}}>",
    		ctx
    	});

    	return block;
    }

    // (101:14) <DropdownItem  on:click={()=> {isOpen = false; push("/2022/Projects");}}>
    function create_default_slot_13(ctx) {
    	let t_3;

    	const block = {
    		c: function create() {
    			t_3 = text("2022");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t_3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t_3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(101:14) <DropdownItem  on:click={()=> {isOpen = false; push(\\\"/2022/Projects\\\");}}>",
    		ctx
    	});

    	return block;
    }

    // (103:14) <DropdownItem  on:click={()=> {isOpen = false; push("/2023/Projects");}}>
    function create_default_slot_12(ctx) {
    	let t_3;

    	const block = {
    		c: function create() {
    			t_3 = text("2023");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t_3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t_3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(103:14) <DropdownItem  on:click={()=> {isOpen = false; push(\\\"/2023/Projects\\\");}}>",
    		ctx
    	});

    	return block;
    }

    // (98:12) <DropdownMenu>
    function create_default_slot_11(ctx) {
    	let dropdownitem0;
    	let t0;
    	let dropdownitem1;
    	let t1;
    	let dropdownitem2;
    	let t2;
    	let dropdownitem3;
    	let t3;
    	let dropdownitem4;
    	let current;

    	dropdownitem0 = new DropdownItem({
    			props: {
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdownitem0.$on("click", /*click_handler_3*/ ctx[14]);
    	dropdownitem1 = new DropdownItem({ props: { divider: true }, $$inline: true });

    	dropdownitem2 = new DropdownItem({
    			props: {
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdownitem2.$on("click", /*click_handler_4*/ ctx[15]);
    	dropdownitem3 = new DropdownItem({ props: { divider: true }, $$inline: true });

    	dropdownitem4 = new DropdownItem({
    			props: {
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdownitem4.$on("click", /*click_handler_5*/ ctx[16]);

    	const block = {
    		c: function create() {
    			create_component(dropdownitem0.$$.fragment);
    			t0 = space();
    			create_component(dropdownitem1.$$.fragment);
    			t1 = space();
    			create_component(dropdownitem2.$$.fragment);
    			t2 = space();
    			create_component(dropdownitem3.$$.fragment);
    			t3 = space();
    			create_component(dropdownitem4.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(dropdownitem0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(dropdownitem1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(dropdownitem2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(dropdownitem3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(dropdownitem4, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const dropdownitem0_changes = {};

    			if (dirty & /*$$scope*/ 536870912) {
    				dropdownitem0_changes.$$scope = { dirty, ctx };
    			}

    			dropdownitem0.$set(dropdownitem0_changes);
    			const dropdownitem2_changes = {};

    			if (dirty & /*$$scope*/ 536870912) {
    				dropdownitem2_changes.$$scope = { dirty, ctx };
    			}

    			dropdownitem2.$set(dropdownitem2_changes);
    			const dropdownitem4_changes = {};

    			if (dirty & /*$$scope*/ 536870912) {
    				dropdownitem4_changes.$$scope = { dirty, ctx };
    			}

    			dropdownitem4.$set(dropdownitem4_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dropdownitem0.$$.fragment, local);
    			transition_in(dropdownitem1.$$.fragment, local);
    			transition_in(dropdownitem2.$$.fragment, local);
    			transition_in(dropdownitem3.$$.fragment, local);
    			transition_in(dropdownitem4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dropdownitem0.$$.fragment, local);
    			transition_out(dropdownitem1.$$.fragment, local);
    			transition_out(dropdownitem2.$$.fragment, local);
    			transition_out(dropdownitem3.$$.fragment, local);
    			transition_out(dropdownitem4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(dropdownitem0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(dropdownitem1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(dropdownitem2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(dropdownitem3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(dropdownitem4, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(98:12) <DropdownMenu>",
    		ctx
    	});

    	return block;
    }

    // (96:10) <Dropdown isOpen={ ProjectOpen } nav inNavbar>
    function create_default_slot_10(ctx) {
    	let dropdowntoggle;
    	let t_3;
    	let dropdownmenu;
    	let current;

    	dropdowntoggle = new DropdownToggle({
    			props: {
    				nav: true,
    				class: "nav-link",
    				caret: true,
    				$$slots: { default: [create_default_slot_15] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdowntoggle.$on("click", /*click_handler_2*/ ctx[13]);

    	dropdownmenu = new DropdownMenu$1({
    			props: {
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(dropdowntoggle.$$.fragment);
    			t_3 = space();
    			create_component(dropdownmenu.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(dropdowntoggle, target, anchor);
    			insert_dev(target, t_3, anchor);
    			mount_component(dropdownmenu, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const dropdowntoggle_changes = {};

    			if (dirty & /*$$scope*/ 536870912) {
    				dropdowntoggle_changes.$$scope = { dirty, ctx };
    			}

    			dropdowntoggle.$set(dropdowntoggle_changes);
    			const dropdownmenu_changes = {};

    			if (dirty & /*$$scope, isOpen*/ 536870914) {
    				dropdownmenu_changes.$$scope = { dirty, ctx };
    			}

    			dropdownmenu.$set(dropdownmenu_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dropdowntoggle.$$.fragment, local);
    			transition_in(dropdownmenu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dropdowntoggle.$$.fragment, local);
    			transition_out(dropdownmenu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(dropdowntoggle, detaching);
    			if (detaching) detach_dev(t_3);
    			destroy_component(dropdownmenu, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(96:10) <Dropdown isOpen={ ProjectOpen } nav inNavbar>",
    		ctx
    	});

    	return block;
    }

    // (111:12) <DropdownToggle nav class="nav-link" caret on:click={() => {isOpen = false; push("/Outsourcing");}}>
    function create_default_slot_9(ctx) {
    	let t_3;

    	const block = {
    		c: function create() {
    			t_3 = text("Outsourcing");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t_3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t_3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(111:12) <DropdownToggle nav class=\\\"nav-link\\\" caret on:click={() => {isOpen = false; push(\\\"/Outsourcing\\\");}}>",
    		ctx
    	});

    	return block;
    }

    // (113:14) <DropdownItem  on:click={()=> {isOpen = false; push("/2022/Outsourcing");}}>
    function create_default_slot_8(ctx) {
    	let t_3;

    	const block = {
    		c: function create() {
    			t_3 = text("2022");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t_3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t_3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(113:14) <DropdownItem  on:click={()=> {isOpen = false; push(\\\"/2022/Outsourcing\\\");}}>",
    		ctx
    	});

    	return block;
    }

    // (115:14) <DropdownItem on:click={()=> {isOpen = false; push("/2023/Outsourcing");}}>
    function create_default_slot_7(ctx) {
    	let t_3;

    	const block = {
    		c: function create() {
    			t_3 = text("2023");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t_3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t_3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(115:14) <DropdownItem on:click={()=> {isOpen = false; push(\\\"/2023/Outsourcing\\\");}}>",
    		ctx
    	});

    	return block;
    }

    // (112:12) <DropdownMenu>
    function create_default_slot_6(ctx) {
    	let dropdownitem0;
    	let t0;
    	let dropdownitem1;
    	let t1;
    	let dropdownitem2;
    	let current;

    	dropdownitem0 = new DropdownItem({
    			props: {
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdownitem0.$on("click", /*click_handler_7*/ ctx[18]);
    	dropdownitem1 = new DropdownItem({ props: { divider: true }, $$inline: true });

    	dropdownitem2 = new DropdownItem({
    			props: {
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdownitem2.$on("click", /*click_handler_8*/ ctx[19]);

    	const block = {
    		c: function create() {
    			create_component(dropdownitem0.$$.fragment);
    			t0 = space();
    			create_component(dropdownitem1.$$.fragment);
    			t1 = space();
    			create_component(dropdownitem2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(dropdownitem0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(dropdownitem1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(dropdownitem2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const dropdownitem0_changes = {};

    			if (dirty & /*$$scope*/ 536870912) {
    				dropdownitem0_changes.$$scope = { dirty, ctx };
    			}

    			dropdownitem0.$set(dropdownitem0_changes);
    			const dropdownitem2_changes = {};

    			if (dirty & /*$$scope*/ 536870912) {
    				dropdownitem2_changes.$$scope = { dirty, ctx };
    			}

    			dropdownitem2.$set(dropdownitem2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dropdownitem0.$$.fragment, local);
    			transition_in(dropdownitem1.$$.fragment, local);
    			transition_in(dropdownitem2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dropdownitem0.$$.fragment, local);
    			transition_out(dropdownitem1.$$.fragment, local);
    			transition_out(dropdownitem2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(dropdownitem0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(dropdownitem1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(dropdownitem2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(112:12) <DropdownMenu>",
    		ctx
    	});

    	return block;
    }

    // (110:10) <Dropdown isOpen={ OutsourcingOpen } nav inNavbar>
    function create_default_slot_5(ctx) {
    	let dropdowntoggle;
    	let t_3;
    	let dropdownmenu;
    	let current;

    	dropdowntoggle = new DropdownToggle({
    			props: {
    				nav: true,
    				class: "nav-link",
    				caret: true,
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdowntoggle.$on("click", /*click_handler_6*/ ctx[17]);

    	dropdownmenu = new DropdownMenu$1({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(dropdowntoggle.$$.fragment);
    			t_3 = space();
    			create_component(dropdownmenu.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(dropdowntoggle, target, anchor);
    			insert_dev(target, t_3, anchor);
    			mount_component(dropdownmenu, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const dropdowntoggle_changes = {};

    			if (dirty & /*$$scope*/ 536870912) {
    				dropdowntoggle_changes.$$scope = { dirty, ctx };
    			}

    			dropdowntoggle.$set(dropdowntoggle_changes);
    			const dropdownmenu_changes = {};

    			if (dirty & /*$$scope, isOpen*/ 536870914) {
    				dropdownmenu_changes.$$scope = { dirty, ctx };
    			}

    			dropdownmenu.$set(dropdownmenu_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dropdowntoggle.$$.fragment, local);
    			transition_in(dropdownmenu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dropdowntoggle.$$.fragment, local);
    			transition_out(dropdownmenu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(dropdowntoggle, detaching);
    			if (detaching) detach_dev(t_3);
    			destroy_component(dropdownmenu, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(110:10) <Dropdown isOpen={ OutsourcingOpen } nav inNavbar>",
    		ctx
    	});

    	return block;
    }

    // (123:12) <NavLink href="https://github.com/abcbank">
    function create_default_slot_4(ctx) {
    	let t_3;

    	const block = {
    		c: function create() {
    			t_3 = text("GitHub");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t_3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t_3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(123:12) <NavLink href=\\\"https://github.com/abcbank\\\">",
    		ctx
    	});

    	return block;
    }

    // (122:10) <NavItem>
    function create_default_slot_3(ctx) {
    	let navlink;
    	let current;

    	navlink = new NavLink({
    			props: {
    				href: "https://github.com/abcbank",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(navlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(navlink, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const navlink_changes = {};

    			if (dirty & /*$$scope*/ 536870912) {
    				navlink_changes.$$scope = { dirty, ctx };
    			}

    			navlink.$set(navlink_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(navlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(122:10) <NavItem>",
    		ctx
    	});

    	return block;
    }

    // (89:6) <Nav class="ms-auto" navbar>
    function create_default_slot_2(ctx) {
    	let div0;
    	let navitem0;
    	let t0;
    	let div1;
    	let dropdown0;
    	let t1;
    	let div2;
    	let dropdown1;
    	let t2;
    	let div3;
    	let navitem1;
    	let current;
    	let mounted;
    	let dispose;

    	navitem0 = new NavItem$1({
    			props: {
    				$$slots: { default: [create_default_slot_16] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdown0 = new Dropdown({
    			props: {
    				isOpen: /*ProjectOpen*/ ctx[2],
    				nav: true,
    				inNavbar: true,
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdown1 = new Dropdown({
    			props: {
    				isOpen: /*OutsourcingOpen*/ ctx[3],
    				nav: true,
    				inNavbar: true,
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	navitem1 = new NavItem$1({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			create_component(navitem0.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			create_component(dropdown0.$$.fragment);
    			t1 = space();
    			div2 = element("div");
    			create_component(dropdown1.$$.fragment);
    			t2 = space();
    			div3 = element("div");
    			create_component(navitem1.$$.fragment);
    			attr_dev(div0, "class", "Items svelte-t6pyxu");
    			add_location(div0, file$S, 89, 8, 2151);
    			attr_dev(div1, "class", "Items svelte-t6pyxu");
    			add_location(div1, file$S, 94, 8, 2331);
    			attr_dev(div2, "class", "Items svelte-t6pyxu");
    			add_location(div2, file$S, 108, 8, 3223);
    			attr_dev(div3, "class", "Items svelte-t6pyxu");
    			add_location(div3, file$S, 120, 8, 3991);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			mount_component(navitem0, div0, null);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(dropdown0, div1, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			mount_component(dropdown1, div2, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);
    			mount_component(navitem1, div3, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div1, "mouseenter", /*ProjectOpenMouseUp*/ ctx[5], false, false, false),
    					listen_dev(div1, "mouseleave", /*ProjectOpenMouseOut*/ ctx[6], false, false, false),
    					listen_dev(div2, "mouseenter", /*OutsourcingOpenMouseUp*/ ctx[7], false, false, false),
    					listen_dev(div2, "mouseleave", /*OutsourcingOpenMouseOut*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const navitem0_changes = {};

    			if (dirty & /*$$scope, isOpen*/ 536870914) {
    				navitem0_changes.$$scope = { dirty, ctx };
    			}

    			navitem0.$set(navitem0_changes);
    			const dropdown0_changes = {};
    			if (dirty & /*ProjectOpen*/ 4) dropdown0_changes.isOpen = /*ProjectOpen*/ ctx[2];

    			if (dirty & /*$$scope, isOpen*/ 536870914) {
    				dropdown0_changes.$$scope = { dirty, ctx };
    			}

    			dropdown0.$set(dropdown0_changes);
    			const dropdown1_changes = {};
    			if (dirty & /*OutsourcingOpen*/ 8) dropdown1_changes.isOpen = /*OutsourcingOpen*/ ctx[3];

    			if (dirty & /*$$scope, isOpen*/ 536870914) {
    				dropdown1_changes.$$scope = { dirty, ctx };
    			}

    			dropdown1.$set(dropdown1_changes);
    			const navitem1_changes = {};

    			if (dirty & /*$$scope*/ 536870912) {
    				navitem1_changes.$$scope = { dirty, ctx };
    			}

    			navitem1.$set(navitem1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navitem0.$$.fragment, local);
    			transition_in(dropdown0.$$.fragment, local);
    			transition_in(dropdown1.$$.fragment, local);
    			transition_in(navitem1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navitem0.$$.fragment, local);
    			transition_out(dropdown0.$$.fragment, local);
    			transition_out(dropdown1.$$.fragment, local);
    			transition_out(navitem1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_component(navitem0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			destroy_component(dropdown0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			destroy_component(dropdown1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div3);
    			destroy_component(navitem1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(89:6) <Nav class=\\\"ms-auto\\\" navbar>",
    		ctx
    	});

    	return block;
    }

    // (88:4) <Collapse { isOpen } navbar expand="md" on:update={handleUpdate}>
    function create_default_slot_1(ctx) {
    	let nav;
    	let current;

    	nav = new Nav({
    			props: {
    				class: "ms-auto",
    				navbar: true,
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(nav.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(nav, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const nav_changes = {};

    			if (dirty & /*$$scope, OutsourcingOpen, isOpen, ProjectOpen*/ 536870926) {
    				nav_changes.$$scope = { dirty, ctx };
    			}

    			nav.$set(nav_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(nav, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(88:4) <Collapse { isOpen } navbar expand=\\\"md\\\" on:update={handleUpdate}>",
    		ctx
    	});

    	return block;
    }

    // (84:2) <Navbar color="dark" dark expand="md">
    function create_default_slot$A(ctx) {
    	let div;
    	let navlogo;
    	let t0;
    	let collapse;
    	let t1;
    	let navuiselector;
    	let current;
    	let mounted;
    	let dispose;
    	navlogo = new Navlogo({ $$inline: true });

    	collapse = new Collapse({
    			props: {
    				isOpen: /*isOpen*/ ctx[1],
    				navbar: true,
    				expand: "md",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	collapse.$on("update", /*handleUpdate*/ ctx[4]);
    	navuiselector = new NavUISelector({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navlogo.$$.fragment);
    			t0 = space();
    			create_component(collapse.$$.fragment);
    			t1 = space();
    			create_component(navuiselector.$$.fragment);
    			add_location(div, file$S, 84, 4, 1942);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(navlogo, div, null);
    			insert_dev(target, t0, anchor);
    			mount_component(collapse, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(navuiselector, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", /*click_handler*/ ctx[11], false, false, false),
    					listen_dev(div, "keydown", keydown_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const collapse_changes = {};
    			if (dirty & /*isOpen*/ 2) collapse_changes.isOpen = /*isOpen*/ ctx[1];

    			if (dirty & /*$$scope, OutsourcingOpen, isOpen, ProjectOpen*/ 536870926) {
    				collapse_changes.$$scope = { dirty, ctx };
    			}

    			collapse.$set(collapse_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navlogo.$$.fragment, local);
    			transition_in(collapse.$$.fragment, local);
    			transition_in(navuiselector.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navlogo.$$.fragment, local);
    			transition_out(collapse.$$.fragment, local);
    			transition_out(navuiselector.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(navlogo);
    			if (detaching) detach_dev(t0);
    			destroy_component(collapse, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(navuiselector, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$A.name,
    		type: "slot",
    		source: "(84:2) <Navbar color=\\\"dark\\\" dark expand=\\\"md\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$S(ctx) {
    	let div;
    	let navbar;
    	let div_resize_listener;
    	let current;
    	let mounted;
    	let dispose;

    	navbar = new Navbar({
    			props: {
    				color: "dark",
    				dark: true,
    				expand: "md",
    				$$slots: { default: [create_default_slot$A] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navbar.$$.fragment);
    			attr_dev(div, "class", "NavBar svelte-t6pyxu");
    			add_render_callback(() => /*div_elementresize_handler*/ ctx[20].call(div));
    			add_location(div, file$S, 79, 0, 1734);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(navbar, div, null);
    			div_resize_listener = add_resize_listener(div, /*div_elementresize_handler*/ ctx[20].bind(div));
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "mouseenter", prevent_default(/*mouseenter_handler*/ ctx[21]), false, true, false),
    					listen_dev(div, "mouseleave", prevent_default(/*mouseleave_handler*/ ctx[22]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const navbar_changes = {};

    			if (dirty & /*$$scope, isOpen, OutsourcingOpen, ProjectOpen*/ 536870926) {
    				navbar_changes.$$scope = { dirty, ctx };
    			}

    			navbar.$set(navbar_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(navbar);
    			div_resize_listener();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$S.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler = () => {
    	
    };

    function instance$S($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, []);
    	let { height } = $$props;
    	let isOpen = false;
    	let isOpen_pre = false;
    	let t;
    	let t_1;
    	let t_2;

    	function handleUpdate(event) {
    		$$invalidate(1, isOpen = event.detail.isOpen);
    	}

    	let ProjectOpen;
    	let OutsourcingOpen;
    	let ProjectOpen_pre;
    	let OutsourcingOpen_pre;

    	function ProjectOpenMouseUp(e) {
    		ProjectOpen_pre = true;
    		clearTimeout(t_1);

    		t_1 = setTimeout(
    			() => {
    				$$invalidate(2, ProjectOpen = ProjectOpen_pre);
    			},
    			100
    		);
    	}

    	function ProjectOpenMouseOut(e) {
    		ProjectOpen_pre = false;
    		clearTimeout(t_1);

    		t_1 = setTimeout(
    			() => {
    				$$invalidate(2, ProjectOpen = ProjectOpen_pre);
    			},
    			100
    		);
    	}

    	function OutsourcingOpenMouseUp(e) {
    		OutsourcingOpen_pre = true;
    		clearTimeout(t_2);

    		t_2 = setTimeout(
    			() => {
    				$$invalidate(3, OutsourcingOpen = OutsourcingOpen_pre);
    			},
    			100
    		);
    	}

    	function OutsourcingOpenMouseOut(e) {
    		OutsourcingOpen_pre = false;
    		clearTimeout(t_2);

    		t_2 = setTimeout(
    			() => {
    				$$invalidate(3, OutsourcingOpen = OutsourcingOpen_pre);
    			},
    			100
    		);
    	}

    	function closeCollapse() {
    		isOpen_pre = false;
    		clearTimeout(t);

    		t = setTimeout(
    			() => {
    				$$invalidate(1, isOpen = isOpen_pre);
    			},
    			300
    		);
    	}

    	function openCollapse() {
    		isOpen_pre = true;
    		clearTimeout(t);

    		t = setTimeout(
    			() => {
    				$$invalidate(1, isOpen = isOpen_pre);
    			},
    			300
    		);
    	}

    	$$self.$$.on_mount.push(function () {
    		if (height === undefined && !('height' in $$props || $$self.$$.bound[$$self.$$.props['height']])) {
    			console.warn("<Navbar> was created without expected prop 'height'");
    		}
    	});

    	const writable_props = ['height'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(1, isOpen = false);
    	};

    	const click_handler_1 = () => {
    		$$invalidate(1, isOpen = false);
    		push("/Profile");
    	};

    	const click_handler_2 = () => {
    		$$invalidate(1, isOpen = false);
    		push("/Projects");
    	};

    	const click_handler_3 = () => {
    		$$invalidate(1, isOpen = false);
    		push("/2021/Projects");
    	};

    	const click_handler_4 = () => {
    		$$invalidate(1, isOpen = false);
    		push("/2022/Projects");
    	};

    	const click_handler_5 = () => {
    		$$invalidate(1, isOpen = false);
    		push("/2023/Projects");
    	};

    	const click_handler_6 = () => {
    		$$invalidate(1, isOpen = false);
    		push("/Outsourcing");
    	};

    	const click_handler_7 = () => {
    		$$invalidate(1, isOpen = false);
    		push("/2022/Outsourcing");
    	};

    	const click_handler_8 = () => {
    		$$invalidate(1, isOpen = false);
    		push("/2023/Outsourcing");
    	};

    	function div_elementresize_handler() {
    		height = this.clientHeight;
    		$$invalidate(0, height);
    	}

    	const mouseenter_handler = () => {
    		openCollapse();
    	};

    	const mouseleave_handler = () => {
    		closeCollapse();
    	};

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    	};

    	$$self.$capture_state = () => ({
    		jquery: jquery__default["default"],
    		season,
    		Collapse,
    		Navbar,
    		Nav,
    		NavItem: NavItem$1,
    		NavLink,
    		Dropdown,
    		DropdownToggle,
    		DropdownMenu: DropdownMenu$1,
    		DropdownItem,
    		NavLogo: Navlogo,
    		NavUISelector,
    		push,
    		height,
    		isOpen,
    		isOpen_pre,
    		t,
    		t_1,
    		t_2,
    		handleUpdate,
    		ProjectOpen,
    		OutsourcingOpen,
    		ProjectOpen_pre,
    		OutsourcingOpen_pre,
    		ProjectOpenMouseUp,
    		ProjectOpenMouseOut,
    		OutsourcingOpenMouseUp,
    		OutsourcingOpenMouseOut,
    		closeCollapse,
    		openCollapse
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('isOpen' in $$props) $$invalidate(1, isOpen = $$props.isOpen);
    		if ('isOpen_pre' in $$props) isOpen_pre = $$props.isOpen_pre;
    		if ('t' in $$props) t = $$props.t;
    		if ('t_1' in $$props) t_1 = $$props.t_1;
    		if ('t_2' in $$props) t_2 = $$props.t_2;
    		if ('ProjectOpen' in $$props) $$invalidate(2, ProjectOpen = $$props.ProjectOpen);
    		if ('OutsourcingOpen' in $$props) $$invalidate(3, OutsourcingOpen = $$props.OutsourcingOpen);
    		if ('ProjectOpen_pre' in $$props) ProjectOpen_pre = $$props.ProjectOpen_pre;
    		if ('OutsourcingOpen_pre' in $$props) OutsourcingOpen_pre = $$props.OutsourcingOpen_pre;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		height,
    		isOpen,
    		ProjectOpen,
    		OutsourcingOpen,
    		handleUpdate,
    		ProjectOpenMouseUp,
    		ProjectOpenMouseOut,
    		OutsourcingOpenMouseUp,
    		OutsourcingOpenMouseOut,
    		closeCollapse,
    		openCollapse,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6,
    		click_handler_7,
    		click_handler_8,
    		div_elementresize_handler,
    		mouseenter_handler,
    		mouseleave_handler
    	];
    }

    class Navbar_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$S, create_fragment$S, safe_not_equal, { height: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar_1",
    			options,
    			id: create_fragment$S.name
    		});
    	}

    	get height() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Snowflakes.svelte generated by Svelte v3.55.1 */
    const file$R = "src\\component\\Snowflakes.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	return child_ctx;
    }

    // (150:4) {#each snowflakes as flake}
    function create_each_block$3(ctx) {
    	let div;
    	let t0_value = /*flake*/ ctx[11].snowIcon + "";
    	let t0;
    	let t1;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(div, "class", "snowflake svelte-1d2e7rn");
    			attr_dev(div, "style", div_style_value = `opacity: ${/*flake*/ ctx[11].opacity}; transform: scale(${/*flake*/ ctx[11].scale}) rotate(${/*flake*/ ctx[11].rotation}deg); left: ${/*flake*/ ctx[11].x}%; top: calc(${/*flake*/ ctx[11].y}% - ${/*flake*/ ctx[11].scale}rem)`);
    			add_location(div, file$R, 150, 6, 5249);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*snowflakes*/ 1 && t0_value !== (t0_value = /*flake*/ ctx[11].snowIcon + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*snowflakes*/ 1 && div_style_value !== (div_style_value = `opacity: ${/*flake*/ ctx[11].opacity}; transform: scale(${/*flake*/ ctx[11].scale}) rotate(${/*flake*/ ctx[11].rotation}deg); left: ${/*flake*/ ctx[11].x}%; top: calc(${/*flake*/ ctx[11].y}% - ${/*flake*/ ctx[11].scale}rem)`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(150:4) {#each snowflakes as flake}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$R(ctx) {
    	let div;
    	let mounted;
    	let dispose;
    	let each_value = /*snowflakes*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "snowframe");
    			attr_dev(div, "aria-hidden", "true");
    			add_location(div, file$R, 148, 0, 5166);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			if (!mounted) {
    				dispose = listen_dev(window, "mousemove", /*handleMouseMove*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*snowflakes*/ 1) {
    				each_value = /*snowflakes*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$R.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const SNOWFLAKES_COUNT = 100;
    const SNOWFLAKE_MIN_SCALE = 1.0;
    const MELTING_SPEED$1 = 1.12;
    const WIND_FORCE$1 = 0.01;
    const FALL_MIN_SPEED$1 = 0.01;
    const FALL_MAX_SPEED$1 = 0.2;
    const TARGET_FPS$2 = 60;
    const boundary$1 = 100;

    function getPower$2(a, b, time) {
    	return a + b / (time * 0.5);
    } //Math.abs(a + b / (time * 0.5)) 
    //Math.sqrt(Math.pow(a, 2) + Math.pow(b / (time * 0.5), 2))

    function getDir$1(a, b, time) {
    	return a + b / (time * 0.5) > 0.0 ? true : false;
    }

    function instance$R($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(7, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Snowflakes', slots, []);
    	const SNOW_ICONS = ['❆', '❅', '❄'];
    	const MS_BETWEEN_FRAMES = 1000 / TARGET_FPS$2;
    	let mx = 0;
    	let my = 0;
    	let dx = 0;
    	let dy = 0;
    	let timer;

    	function handleMouseMove({ clientX, clientY }) {
    		clearTimeout(timer);

    		timer = setTimeout(
    			() => {
    				dx = 0;
    				dy = 0;
    			},
    			50
    		);

    		dx = mx - clientX;
    		dy = my - clientY;
    		mx = clientX;
    		my = clientY;
    	}

    	// this function generates the random configuration with all necessary values
    	function randomSnowflakeConfig(i) {
    		var temp = {
    			scale: SNOWFLAKE_MIN_SCALE + Math.random() * (1 - SNOWFLAKE_MIN_SCALE),
    			x: -20 + Math.random() * 120,
    			y: -100 + Math.random() * 200,
    			rotation: Math.floor(Math.random() * 360),
    			speed: FALL_MIN_SPEED$1 + Math.random() * (-FALL_MIN_SPEED$1 + FALL_MAX_SPEED$1),
    			snowIcon: SNOW_ICONS[i % SNOW_ICONS.length],
    			opacity: 0.999,
    			GravityForce: [0, 0],
    			MouseForce: [0, 0],
    			MouseTouchedTime: 1,
    			EnableMouseForce: true
    		};

    		temp.GravityForce[0] = WIND_FORCE$1 * temp.scale;
    		temp.GravityForce[1] = temp.speed * temp.scale;
    		return temp;
    	}

    	// actially generating the snowflakes
    	let snowflakes = new Array(SNOWFLAKES_COUNT).fill().map((_, i) => randomSnowflakeConfig(i)).sort((a, b) => a.scale - b.scale);

    	// in onMount we define the loop function and start our animationFrame loop.
    	onMount(async () => {
    		let frame, lastTime;

    		function loop(timestamp) {
    			frame = requestAnimationFrame(loop);
    			const elapsed = timestamp - lastTime;
    			lastTime = timestamp;
    			let framesCompleted = elapsed / MS_BETWEEN_FRAMES;

    			if (isNaN(framesCompleted)) {
    				framesCompleted = 1;
    			}

    			$$invalidate(0, snowflakes = snowflakes.map(flake => {

    				if (flake.y >= 100) {
    					flake.opacity = Math.pow(flake.opacity, MELTING_SPEED$1);
    				} else {
    					let p_flake_x = flake.x * document.body.clientWidth / 100;
    					let p_flake_y = flake.y * document.body.clientHeight / 100;

    					if (flake.EnableMouseForce && mx != 0 && mx != 0 && mx - boundary$1 / 2 <= p_flake_x && p_flake_x <= mx + boundary$1 / 2 && my - boundary$1 / 2 <= p_flake_y && p_flake_y <= my + boundary$1 / 2) {
    						let distance = Math.sqrt(Math.pow(p_flake_x - mx, 2) + Math.pow(p_flake_y - my, 2)) / 1000;

    						flake.MouseForce = [
    							-1 / distance * 5 * dx / document.body.clientWidth,
    							-1 / distance * 5 * dy / document.body.clientHeight
    						];

    						flake.MouseTouchedTime = 1;
    						flake.EnableMouseForce = false;
    					} else if (mx - boundary$1 / 2 <= p_flake_x && p_flake_x <= mx + boundary$1 / 2 && my - boundary$1 / 2 <= p_flake_y && p_flake_y <= my + boundary$1 / 2) {
    						flake.EnableMouseForce = true;
    					}

    					flake.rotation = (flake.rotation + 1 * framesCompleted) % 360;
    					getDir$1(flake.GravityForce[0], flake.MouseForce[0], flake.MouseTouchedTime);
    					getDir$1(flake.GravityForce[1], flake.MouseForce[1], flake.MouseTouchedTime);
    					getPower$2(flake.GravityForce[0], flake.MouseForce[0], flake.MouseTouchedTime);
    					getPower$2(flake.GravityForce[1], flake.MouseForce[1], flake.MouseTouchedTime);
    					flake.x += getPower$2(flake.GravityForce[0], flake.MouseForce[0], flake.MouseTouchedTime);
    					flake.y += getPower$2(flake.GravityForce[1], flake.MouseForce[1], flake.MouseTouchedTime);
    					flake.MouseTouchedTime++;
    				}

    				if (flake.opacity <= 0.02) {
    					flake.MouseForce = [0, 0];
    					flake.x = -20 + Math.random() * 120;
    					flake.y = -20;
    					flake.opacity = 0.999;
    				}

    				return flake;
    			}));
    		}

    		loop();
    		if ($season == "Winter") return () => cancelAnimationFrame(frame); else return;
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Snowflakes> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		onMount,
    		SNOWFLAKES_COUNT,
    		SNOWFLAKE_MIN_SCALE,
    		MELTING_SPEED: MELTING_SPEED$1,
    		WIND_FORCE: WIND_FORCE$1,
    		FALL_MIN_SPEED: FALL_MIN_SPEED$1,
    		FALL_MAX_SPEED: FALL_MAX_SPEED$1,
    		SNOW_ICONS,
    		TARGET_FPS: TARGET_FPS$2,
    		MS_BETWEEN_FRAMES,
    		boundary: boundary$1,
    		mx,
    		my,
    		dx,
    		dy,
    		timer,
    		handleMouseMove,
    		getPower: getPower$2,
    		getDir: getDir$1,
    		randomSnowflakeConfig,
    		snowflakes,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('mx' in $$props) mx = $$props.mx;
    		if ('my' in $$props) my = $$props.my;
    		if ('dx' in $$props) dx = $$props.dx;
    		if ('dy' in $$props) dy = $$props.dy;
    		if ('timer' in $$props) timer = $$props.timer;
    		if ('snowflakes' in $$props) $$invalidate(0, snowflakes = $$props.snowflakes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [snowflakes, handleMouseMove];
    }

    class Snowflakes extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$R, create_fragment$R, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Snowflakes",
    			options,
    			id: create_fragment$R.name
    		});
    	}
    }

    /* src\component\Sakura.svelte generated by Svelte v3.55.1 */
    const file$Q = "src\\component\\Sakura.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (153:4) {#each sakuraflakes as flake}
    function create_each_block$2(ctx) {
    	let div;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "sakuraflake svelte-fdqqpk");

    			attr_dev(div, "style", div_style_value = `opacity: ${/*flake*/ ctx[9].opacity}; height: ${/*flake*/ ctx[9].height}; width: ${/*flake*/ ctx[9].width}; border-radius: ${/*flake*/ ctx[9].borderRadius[0]}px ${/*flake*/ ctx[9].borderRadius[1]}px;
        transform: scale(1) rotate(${/*flake*/ ctx[9].rotation}deg); left: ${/*flake*/ ctx[9].x}%; top: calc(${/*flake*/ ctx[9].y}% - 1rem)`);

    			add_location(div, file$Q, 153, 6, 5387);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sakuraflakes*/ 1 && div_style_value !== (div_style_value = `opacity: ${/*flake*/ ctx[9].opacity}; height: ${/*flake*/ ctx[9].height}; width: ${/*flake*/ ctx[9].width}; border-radius: ${/*flake*/ ctx[9].borderRadius[0]}px ${/*flake*/ ctx[9].borderRadius[1]}px;
        transform: scale(1) rotate(${/*flake*/ ctx[9].rotation}deg); left: ${/*flake*/ ctx[9].x}%; top: calc(${/*flake*/ ctx[9].y}% - 1rem)`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(153:4) {#each sakuraflakes as flake}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$Q(ctx) {
    	let div;
    	let mounted;
    	let dispose;
    	let each_value = /*sakuraflakes*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "sakuraframe");
    			attr_dev(div, "aria-hidden", "true");
    			add_location(div, file$Q, 151, 0, 5300);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			if (!mounted) {
    				dispose = listen_dev(window, "mousemove", /*handleMouseMove*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*sakuraflakes*/ 1) {
    				each_value = /*sakuraflakes*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$Q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const FLAKES_COUNT = 100;
    const MELTING_SPEED = 1.12;
    const WIND_FORCE = 0.01;
    const FALL_MIN_SPEED = 0.01;
    const FALL_MAX_SPEED = 0.2;
    const TARGET_FPS$1 = 60;
    const MIN_SIZE = 10;
    const MAX_SIZE = 14;
    const boundary = 100;

    function getPower$1(a, b, time) {
    	return a + b / (time * 0.5);
    } //Math.abs(a + b / (time * 0.5)) 
    //Math.sqrt(Math.pow(a, 2) + Math.pow(b / (time * 0.5), 2))

    function getDir(a, b, time) {
    	return a + b / (time * 0.5) > 0.0 ? true : false;
    }

    // this function generates the random configuration with all necessary values
    function randomSnowflakeConfig(i) {
    	var temp = {
    		height: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
    		width: 0,
    		borderRadius: [0, 0],
    		x: -20 + Math.random() * 120,
    		y: -100 + Math.random() * 200,
    		rotation: Math.floor(Math.random() * 360),
    		speed: FALL_MIN_SPEED + Math.random() * (-FALL_MIN_SPEED + FALL_MAX_SPEED),
    		opacity: 0.999,
    		GravityForce: [0, 0],
    		MouseForce: [0, 0],
    		MouseTouchedTime: 1,
    		EnableMouseForce: true
    	};

    	temp.GravityForce[0] = WIND_FORCE;
    	temp.GravityForce[1] = temp.speed;
    	temp.width = temp.height - Math.floor(Math.random() * temp.height / 3);

    	temp.borderRadius = [
    		MAX_SIZE + Math.floor(Math.random() * 10),
    		Math.floor(1 + Math.random() * (temp.width / 4))
    	];

    	return temp;
    }

    function instance$Q($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(7, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sakura', slots, []);
    	const MS_BETWEEN_FRAMES = 1000 / TARGET_FPS$1;
    	let mx = 0;
    	let my = 0;
    	let dx = 0;
    	let dy = 0;
    	let timer;

    	function handleMouseMove({ clientX, clientY }) {
    		clearTimeout(timer);

    		timer = setTimeout(
    			() => {
    				dx = 0;
    				dy = 0;
    			},
    			50
    		);

    		dx = mx - clientX;
    		dy = my - clientY;
    		mx = clientX;
    		my = clientY;
    	}

    	// actially generating the sakuraflakes
    	let sakuraflakes = new Array(FLAKES_COUNT).fill().map((_, i) => randomSnowflakeConfig()).sort((a, b) => a.scale - b.scale);

    	// in onMount we define the loop function and start our animationFrame loop.
    	onMount(async () => {
    		let frame, lastTime;

    		function loop(timestamp) {
    			frame = requestAnimationFrame(loop);
    			const elapsed = timestamp - lastTime;
    			lastTime = timestamp;
    			let framesCompleted = elapsed / MS_BETWEEN_FRAMES;

    			if (isNaN(framesCompleted)) {
    				framesCompleted = 1;
    			}

    			$$invalidate(0, sakuraflakes = sakuraflakes.map(flake => {

    				if (flake.y >= 100) {
    					flake.opacity = Math.pow(flake.opacity, MELTING_SPEED);
    				} else {
    					let p_flake_x = flake.x * document.body.clientWidth / 100;
    					let p_flake_y = flake.y * document.body.clientHeight / 100;

    					if (flake.EnableMouseForce && mx != 0 && mx != 0 && mx - boundary / 2 <= p_flake_x && p_flake_x <= mx + boundary / 2 && my - boundary / 2 <= p_flake_y && p_flake_y <= my + boundary / 2) {
    						let distance = Math.sqrt(Math.pow(p_flake_x - mx, 2) + Math.pow(p_flake_y - my, 2)) / 1000;

    						flake.MouseForce = [
    							-1 / distance * 5 * dx / document.body.clientWidth,
    							-1 / distance * 5 * dy / document.body.clientHeight
    						];

    						flake.MouseTouchedTime = 1;
    						flake.EnableMouseForce = false;
    					} else if (mx - boundary / 2 <= p_flake_x && p_flake_x <= mx + boundary / 2 && my - boundary / 2 <= p_flake_y && p_flake_y <= my + boundary / 2) {
    						flake.EnableMouseForce = true;
    					}

    					flake.rotation = (flake.rotation + 1 * framesCompleted) % 360;
    					getDir(flake.GravityForce[0], flake.MouseForce[0], flake.MouseTouchedTime);
    					getDir(flake.GravityForce[1], flake.MouseForce[1], flake.MouseTouchedTime);
    					getPower$1(flake.GravityForce[0], flake.MouseForce[0], flake.MouseTouchedTime);
    					getPower$1(flake.GravityForce[1], flake.MouseForce[1], flake.MouseTouchedTime);
    					flake.x += getPower$1(flake.GravityForce[0], flake.MouseForce[0], flake.MouseTouchedTime);
    					flake.y += getPower$1(flake.GravityForce[1], flake.MouseForce[1], flake.MouseTouchedTime);
    					flake.MouseTouchedTime++;
    				}

    				if (flake.opacity <= 0.02) {
    					flake.MouseForce = [0, 0];
    					flake.x = -20 + Math.random() * 120;
    					flake.y = -20;
    					flake.opacity = 0.999;
    				}

    				return flake;
    			}));
    		}

    		loop();
    		if ($season == "Spring") return () => cancelAnimationFrame(frame); else return;
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sakura> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		onMount,
    		FLAKES_COUNT,
    		MELTING_SPEED,
    		WIND_FORCE,
    		FALL_MIN_SPEED,
    		FALL_MAX_SPEED,
    		TARGET_FPS: TARGET_FPS$1,
    		MIN_SIZE,
    		MAX_SIZE,
    		MS_BETWEEN_FRAMES,
    		boundary,
    		mx,
    		my,
    		dx,
    		dy,
    		timer,
    		getPower: getPower$1,
    		getDir,
    		handleMouseMove,
    		randomSnowflakeConfig,
    		sakuraflakes,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('mx' in $$props) mx = $$props.mx;
    		if ('my' in $$props) my = $$props.my;
    		if ('dx' in $$props) dx = $$props.dx;
    		if ('dy' in $$props) dy = $$props.dy;
    		if ('timer' in $$props) timer = $$props.timer;
    		if ('sakuraflakes' in $$props) $$invalidate(0, sakuraflakes = $$props.sakuraflakes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [sakuraflakes, handleMouseMove];
    }

    class Sakura extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$Q, create_fragment$Q, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sakura",
    			options,
    			id: create_fragment$Q.name
    		});
    	}
    }

    /* src\component\Fish.svelte generated by Svelte v3.55.1 */
    const file$P = "src\\component\\Fish.svelte";

    // (194:28) 
    function create_if_block_11(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_12*/ ctx[13]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_12*/ 8192) set_data_dev(t, /*$fish_12*/ ctx[13]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(194:28) ",
    		ctx
    	});

    	return block;
    }

    // (192:28) 
    function create_if_block_10(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_11*/ ctx[12]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_11*/ 4096) set_data_dev(t, /*$fish_11*/ ctx[12]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(192:28) ",
    		ctx
    	});

    	return block;
    }

    // (190:27) 
    function create_if_block_9(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_10*/ ctx[11]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_10*/ 2048) set_data_dev(t, /*$fish_10*/ ctx[11]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(190:27) ",
    		ctx
    	});

    	return block;
    }

    // (188:27) 
    function create_if_block_8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_09*/ ctx[10]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_09*/ 1024) set_data_dev(t, /*$fish_09*/ ctx[10]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(188:27) ",
    		ctx
    	});

    	return block;
    }

    // (186:27) 
    function create_if_block_7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_08*/ ctx[9]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_08*/ 512) set_data_dev(t, /*$fish_08*/ ctx[9]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(186:27) ",
    		ctx
    	});

    	return block;
    }

    // (184:27) 
    function create_if_block_6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_07*/ ctx[8]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_07*/ 256) set_data_dev(t, /*$fish_07*/ ctx[8]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(184:27) ",
    		ctx
    	});

    	return block;
    }

    // (182:27) 
    function create_if_block_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_06*/ ctx[7]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_06*/ 128) set_data_dev(t, /*$fish_06*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(182:27) ",
    		ctx
    	});

    	return block;
    }

    // (180:27) 
    function create_if_block_4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_05*/ ctx[6]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_05*/ 64) set_data_dev(t, /*$fish_05*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(180:27) ",
    		ctx
    	});

    	return block;
    }

    // (178:27) 
    function create_if_block_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_04*/ ctx[5]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_04*/ 32) set_data_dev(t, /*$fish_04*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(178:27) ",
    		ctx
    	});

    	return block;
    }

    // (176:27) 
    function create_if_block_2$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_03*/ ctx[4]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_03*/ 16) set_data_dev(t, /*$fish_03*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(176:27) ",
    		ctx
    	});

    	return block;
    }

    // (174:27) 
    function create_if_block_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_02*/ ctx[3]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_02*/ 8) set_data_dev(t, /*$fish_02*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(174:27) ",
    		ctx
    	});

    	return block;
    }

    // (172:8) {#if idx == 0}
    function create_if_block$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*$fish_01*/ ctx[2]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$fish_01*/ 4) set_data_dev(t, /*$fish_01*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(172:8) {#if idx == 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$P(ctx) {
    	let div;
    	let pre;
    	let t0;
    	let br;
    	let t1;
    	let b;
    	let t2;
    	let t3;
    	let t4;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*idx*/ ctx[1] == 0) return create_if_block$2;
    		if (/*idx*/ ctx[1] == 1) return create_if_block_1$1;
    		if (/*idx*/ ctx[1] == 2) return create_if_block_2$1;
    		if (/*idx*/ ctx[1] == 3) return create_if_block_3$1;
    		if (/*idx*/ ctx[1] == 4) return create_if_block_4;
    		if (/*idx*/ ctx[1] == 5) return create_if_block_5;
    		if (/*idx*/ ctx[1] == 6) return create_if_block_6;
    		if (/*idx*/ ctx[1] == 7) return create_if_block_7;
    		if (/*idx*/ ctx[1] == 8) return create_if_block_8;
    		if (/*idx*/ ctx[1] == 9) return create_if_block_9;
    		if (/*idx*/ ctx[1] == 10) return create_if_block_10;
    		if (/*idx*/ ctx[1] == 11) return create_if_block_11;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			pre = element("pre");
    			t0 = text("    ");
    			br = element("br");
    			t1 = text("\r\n    ");
    			b = element("b");
    			t2 = text("\r\n\r\n        ");
    			if (if_block) if_block.c();
    			t3 = text("\r\n    ");
    			t4 = text("\r\n    ");
    			add_location(br, file$P, 168, 4, 5726);
    			add_location(b, file$P, 169, 4, 5737);
    			add_location(pre, file$P, 167, 4, 5715);
    			attr_dev(div, "class", "Fish svelte-1bi078q");
    			set_style(div, "transform", "translate(-50%, -50%) rotate(" + (Math.atan2(/*config*/ ctx[0].movingVector[1], /*config*/ ctx[0].movingVector[0]) + Math.PI / 2) + "rad) scale(" + /*config*/ ctx[0].scale + ")");
    			set_style(div, "left", /*config*/ ctx[0].startPoint[0] + "%");
    			set_style(div, "top", /*config*/ ctx[0].startPoint[1] + "%");
    			add_location(div, file$P, 166, 0, 5480);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, pre);
    			append_dev(pre, t0);
    			append_dev(pre, br);
    			append_dev(pre, t1);
    			append_dev(pre, b);
    			append_dev(b, t2);
    			if (if_block) if_block.m(b, null);
    			append_dev(b, t3);
    			append_dev(pre, t4);

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "mousedown", /*handleMouseDown*/ ctx[14], false, false, false),
    					listen_dev(window, "mousemove", /*handleMouseMove*/ ctx[15], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(b, t3);
    				}
    			}

    			if (dirty & /*config*/ 1) {
    				set_style(div, "transform", "translate(-50%, -50%) rotate(" + (Math.atan2(/*config*/ ctx[0].movingVector[1], /*config*/ ctx[0].movingVector[0]) + Math.PI / 2) + "rad) scale(" + /*config*/ ctx[0].scale + ")");
    			}

    			if (dirty & /*config*/ 1) {
    				set_style(div, "left", /*config*/ ctx[0].startPoint[0] + "%");
    			}

    			if (dirty & /*config*/ 1) {
    				set_style(div, "top", /*config*/ ctx[0].startPoint[1] + "%");
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			if (if_block) {
    				if_block.d();
    			}

    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$P.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const TARGET_FPS = 60;

    function createConfig() {
    	return {
    		scale: 0.02 + Math.random() / 60,
    		startPoint: [Math.random() * 100, Math.random() * 100],
    		destPoint: [Math.random() * 100, Math.random() * 100],
    		movingVector: [0, 0],
    		sleepingTime: 0,
    		time: 0,
    		runningOffset: 0.7 + Math.random() * 0.3,
    		runningAway: false
    	};
    }

    function getPower(Vector) {
    	return Math.sqrt(Math.pow(Vector[0], 2) + Math.pow(Vector[1], 2) + 1);
    }

    function axisFilter(i) {
    	if (i < 0) return 0; else if (i > 100) return 100; else return i;
    }

    function instance$P($$self, $$props, $$invalidate) {
    	let $season;
    	let $fish_01;
    	let $fish_02;
    	let $fish_03;
    	let $fish_04;
    	let $fish_05;
    	let $fish_06;
    	let $fish_07;
    	let $fish_08;
    	let $fish_09;
    	let $fish_10;
    	let $fish_11;
    	let $fish_12;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(20, $season = $$value));
    	validate_store(fish_01, 'fish_01');
    	component_subscribe($$self, fish_01, $$value => $$invalidate(2, $fish_01 = $$value));
    	validate_store(fish_02, 'fish_02');
    	component_subscribe($$self, fish_02, $$value => $$invalidate(3, $fish_02 = $$value));
    	validate_store(fish_03, 'fish_03');
    	component_subscribe($$self, fish_03, $$value => $$invalidate(4, $fish_03 = $$value));
    	validate_store(fish_04, 'fish_04');
    	component_subscribe($$self, fish_04, $$value => $$invalidate(5, $fish_04 = $$value));
    	validate_store(fish_05, 'fish_05');
    	component_subscribe($$self, fish_05, $$value => $$invalidate(6, $fish_05 = $$value));
    	validate_store(fish_06, 'fish_06');
    	component_subscribe($$self, fish_06, $$value => $$invalidate(7, $fish_06 = $$value));
    	validate_store(fish_07, 'fish_07');
    	component_subscribe($$self, fish_07, $$value => $$invalidate(8, $fish_07 = $$value));
    	validate_store(fish_08, 'fish_08');
    	component_subscribe($$self, fish_08, $$value => $$invalidate(9, $fish_08 = $$value));
    	validate_store(fish_09, 'fish_09');
    	component_subscribe($$self, fish_09, $$value => $$invalidate(10, $fish_09 = $$value));
    	validate_store(fish_10, 'fish_10');
    	component_subscribe($$self, fish_10, $$value => $$invalidate(11, $fish_10 = $$value));
    	validate_store(fish_11, 'fish_11');
    	component_subscribe($$self, fish_11, $$value => $$invalidate(12, $fish_11 = $$value));
    	validate_store(fish_12, 'fish_12');
    	component_subscribe($$self, fish_12, $$value => $$invalidate(13, $fish_12 = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Fish', slots, []);
    	const MS_BETWEEN_FRAMES = 1000 / TARGET_FPS;
    	let easingType = [identity, circInOut, cubicInOut, expoInOut];
    	let config;
    	let idx = 0;
    	let lastTime = 0;
    	let mx, my;
    	let mouseclick = false;

    	function nextFrame(timestamp) {
    		let elapsed = timestamp - lastTime;
    		let speed = getPower(config.movingVector);

    		if (elapsed / 30 * speed > MS_BETWEEN_FRAMES && config.sleepingTime == 0) {
    			lastTime = timestamp;
    			$$invalidate(1, idx = (idx + 1) % 12);
    		}

    		return elapsed;
    	}

    	function destArrived(awaitTime) {
    		if (config.sleepingTime < awaitTime) {
    			$$invalidate(0, config.sleepingTime++, config);
    		} else {
    			$$invalidate(0, config.sleepingTime = 0, config);
    			$$invalidate(0, config.time = 0, config);
    			$$invalidate(0, config.movingVector = [0, 0], config);
    			$$invalidate(0, config.destPoint = [Math.random() * 100, Math.random() * 100], config);
    			$$invalidate(0, config.runningAway = false, config);
    		}
    	}

    	function runAway(runningVector) {
    		let distance = getPower(runningVector);
    		runningVector = [runningVector[0] / distance, runningVector[1] / distance];
    		$$invalidate(0, config.movingVector = [runningVector[0] * 150, runningVector[1] * 150], config);

    		$$invalidate(
    			0,
    			config.startPoint = [
    				axisFilter(config.startPoint[0] + config.movingVector[0] / 15),
    				axisFilter(config.startPoint[1] + config.movingVector[1] / 15)
    			],
    			config
    		);

    		$$invalidate(0, config.time = 0, config);
    		$$invalidate(0, config.sleepingTime = 0, config);
    		$$invalidate(0, config.time++, config);
    		$$invalidate(0, config.runningAway = true, config);
    	}

    	function runningAway() {
    		let toMovePower = getPower(config.movingVector);

    		if (toMovePower < 2) {
    			destArrived(20);
    		} else {
    			$$invalidate(
    				0,
    				config.movingVector = [
    					config.movingVector[0] * config.runningOffset,
    					config.movingVector[1] * config.runningOffset
    				],
    				config
    			);
    		}

    		if (config.sleepingTime == 0) {
    			$$invalidate(
    				0,
    				config.startPoint = [
    					config.startPoint[0] + config.movingVector[0] / 30,
    					config.startPoint[1] + config.movingVector[1] / 30
    				],
    				config
    			);
    		}

    		$$invalidate(0, config.time++, config);
    	}

    	function moveToDest() {
    		let toMoveVector = [
    			config.destPoint[0] - config.startPoint[0],
    			config.destPoint[1] - config.startPoint[1]
    		];

    		let toMovePower = getPower(toMoveVector);

    		if (toMovePower < 2) {
    			destArrived(80);
    		} else {
    			var offset = Math.random();

    			$$invalidate(
    				0,
    				config.movingVector = [
    					config.movingVector[0] * offset + toMoveVector[0] * (1 - offset) * config.time / 500,
    					config.movingVector[1] * offset + toMoveVector[1] * (1 - offset) * config.time / 500
    				],
    				config
    			);
    		}

    		if (config.sleepingTime == 0) {
    			$$invalidate(
    				0,
    				config.startPoint = [
    					config.startPoint[0] + config.movingVector[0] / 30,
    					config.startPoint[1] + config.movingVector[1] / 30
    				],
    				config
    			);
    		}

    		$$invalidate(0, config.time++, config);
    	}

    	function move() {
    		if (config.runningAway) {
    			runningAway();
    		} else {
    			moveToDest();
    		}
    	}

    	config = createConfig();

    	onMount(async () => {
    		let frame;

    		function loop(timestamp) {
    			frame = requestAnimationFrame(loop);
    			let elapsed = nextFrame(timestamp);

    			if (elapsed > MS_BETWEEN_FRAMES) {
    				if (mouseclick) {
    					// mouseclick = $clicked;
    					mouseclick = false;

    					let mouseX = 100 - (document.body.clientWidth - mx) / document.body.clientWidth * 100;
    					let mouseY = 100 - (document.body.clientHeight - my) / document.body.clientHeight * 100;
    					let runningVector = [config.startPoint[0] - mouseX, config.startPoint[1] - mouseY];
    					let distance = getPower(runningVector);

    					if (distance < 30) {
    						runAway(runningVector);
    					} else {
    						move();
    					}
    				} else {
    					move();
    				}
    			}
    		}

    		loop();
    		if ($season == "Summer") return () => cancelAnimationFrame(frame); else return;
    	});

    	function handleMouseDown() {
    		mouseclick = true;
    	}

    	function handleMouseMove({ clientX, clientY }) {
    		mx = clientX;
    		my = clientY;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Fish> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		onMount,
    		fish,
    		fish_01,
    		fish_02,
    		fish_03,
    		fish_04,
    		fish_05,
    		fish_06,
    		fish_07,
    		fish_08,
    		fish_09,
    		fish_10,
    		fish_11,
    		fish_12,
    		linear: identity,
    		circInOut,
    		cubicInOut,
    		expoInOut,
    		TARGET_FPS,
    		MS_BETWEEN_FRAMES,
    		easingType,
    		config,
    		idx,
    		lastTime,
    		mx,
    		my,
    		mouseclick,
    		createConfig,
    		getPower,
    		axisFilter,
    		nextFrame,
    		destArrived,
    		runAway,
    		runningAway,
    		moveToDest,
    		move,
    		handleMouseDown,
    		handleMouseMove,
    		$season,
    		$fish_01,
    		$fish_02,
    		$fish_03,
    		$fish_04,
    		$fish_05,
    		$fish_06,
    		$fish_07,
    		$fish_08,
    		$fish_09,
    		$fish_10,
    		$fish_11,
    		$fish_12
    	});

    	$$self.$inject_state = $$props => {
    		if ('easingType' in $$props) easingType = $$props.easingType;
    		if ('config' in $$props) $$invalidate(0, config = $$props.config);
    		if ('idx' in $$props) $$invalidate(1, idx = $$props.idx);
    		if ('lastTime' in $$props) lastTime = $$props.lastTime;
    		if ('mx' in $$props) mx = $$props.mx;
    		if ('my' in $$props) my = $$props.my;
    		if ('mouseclick' in $$props) mouseclick = $$props.mouseclick;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		config,
    		idx,
    		$fish_01,
    		$fish_02,
    		$fish_03,
    		$fish_04,
    		$fish_05,
    		$fish_06,
    		$fish_07,
    		$fish_08,
    		$fish_09,
    		$fish_10,
    		$fish_11,
    		$fish_12,
    		handleMouseDown,
    		handleMouseMove
    	];
    }

    class Fish extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$P, create_fragment$P, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Fish",
    			options,
    			id: create_fragment$P.name
    		});
    	}
    }

    /* src\component\Lake.svelte generated by Svelte v3.55.1 */
    const file$O = "src\\component\\Lake.svelte";

    function create_fragment$O(ctx) {
    	let div;
    	let fish0;
    	let t0;
    	let fish1;
    	let t1;
    	let fish2;
    	let t2;
    	let fish3;
    	let t3;
    	let fish4;
    	let current;
    	fish0 = new Fish({ $$inline: true });
    	fish1 = new Fish({ $$inline: true });
    	fish2 = new Fish({ $$inline: true });
    	fish3 = new Fish({ $$inline: true });
    	fish4 = new Fish({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(fish0.$$.fragment);
    			t0 = space();
    			create_component(fish1.$$.fragment);
    			t1 = space();
    			create_component(fish2.$$.fragment);
    			t2 = space();
    			create_component(fish3.$$.fragment);
    			t3 = space();
    			create_component(fish4.$$.fragment);
    			attr_dev(div, "class", "Lake");
    			add_location(div, file$O, 13, 0, 380);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(fish0, div, null);
    			append_dev(div, t0);
    			mount_component(fish1, div, null);
    			append_dev(div, t1);
    			mount_component(fish2, div, null);
    			append_dev(div, t2);
    			mount_component(fish3, div, null);
    			append_dev(div, t3);
    			mount_component(fish4, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(fish0.$$.fragment, local);
    			transition_in(fish1.$$.fragment, local);
    			transition_in(fish2.$$.fragment, local);
    			transition_in(fish3.$$.fragment, local);
    			transition_in(fish4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(fish0.$$.fragment, local);
    			transition_out(fish1.$$.fragment, local);
    			transition_out(fish2.$$.fragment, local);
    			transition_out(fish3.$$.fragment, local);
    			transition_out(fish4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(fish0);
    			destroy_component(fish1);
    			destroy_component(fish2);
    			destroy_component(fish3);
    			destroy_component(fish4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$O.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$O($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Lake', slots, []);

    	onMount(() => {
    		jquery__default["default"](".full-landing-image").ripples({
    			resolution: 256, // 렌더링 값이 클수록 잔물결 효과가 느리게 전파
    			perturbance: 0.02, // 잔물경 굴절 강도. 0은 굴절 없음
    			
    		});

    		jquery__default["default"](".full-landing-image").ripples('play');
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Lake> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ jquery: jquery__default["default"], onMount, Fish });
    	return [];
    }

    class Lake extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$O, create_fragment$O, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Lake",
    			options,
    			id: create_fragment$O.name
    		});
    	}
    }

    /* src\component\Tree.svelte generated by Svelte v3.55.1 */
    const file$N = "src\\component\\Tree.svelte";

    function create_fragment$N(ctx) {
    	let canvas_1;

    	const block = {
    		c: function create() {
    			canvas_1 = element("canvas");
    			attr_dev(canvas_1, "class", "Tree svelte-qs88f0");
    			attr_dev(canvas_1, "width", /*canvasWidth*/ ctx[2]);
    			attr_dev(canvas_1, "height", /*canvasHeight*/ ctx[3]);
    			set_style(canvas_1, "left", /*location*/ ctx[0][0] + "%");
    			set_style(canvas_1, "top", /*toTop*/ ctx[5](/*location*/ ctx[0][1]) + "%");
    			set_style(canvas_1, "transform", "translate(-50%, -50%) scale(" + /*Scale*/ ctx[4] + ")");
    			add_location(canvas_1, file$N, 178, 0, 5017);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, canvas_1, anchor);
    			/*canvas_1_binding*/ ctx[6](canvas_1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*location*/ 1) {
    				set_style(canvas_1, "left", /*location*/ ctx[0][0] + "%");
    			}

    			if (dirty & /*location*/ 1) {
    				set_style(canvas_1, "top", /*toTop*/ ctx[5](/*location*/ ctx[0][1]) + "%");
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(canvas_1);
    			/*canvas_1_binding*/ ctx[6](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$N.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function each(array, fn, i) {
    	var idx = 0, len = array.length;

    	for (; idx < len; idx++) {
    		fn(array[idx], i);
    	}
    }

    function create_branch(origin, magnitude, thickness, theta, lightness) {
    	return {
    		origin,
    		thickness,
    		theta,
    		magnitude,
    		tip: { x: origin.x, y: origin.y },
    		lightness,
    		sprouts: Math.random() * 4 + 1 >>> 0
    	};
    }

    function instance$N($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(11, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tree', slots, []);

    	var requestAnimationFrame = (function () {
    		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
    			window.setTimeout(callback, 1000 / 16);
    		};
    	})();

    	let { location } = $$props;
    	var growth_rate = 2;
    	var maximum_bend = 90 / 180 * Math.PI;
    	var smallest_branch = 40 + 10 * Math.random();
    	var hue = 360 * Math.random();
    	var fps;
    	var canvas;
    	var ctx;
    	var avgTime = 0;
    	var frameCounter = 0;
    	var trackFrames = 150;
    	var canvasWidth = 1000;
    	var canvasHeight = 800;
    	var Scale = 1;
    	var LandOffset = 40 * Math.random();
    	var trees = [];
    	var StopTrigger = true;

    	function hsl(lightness) {
    		return 'hsl(' + hue + ',70%,' + lightness + '%)';
    	}

    	function plant_tree(i) {
    		var l = 60,
    			thickness = 16 + 20 * Math.random(),
    			theta = -0.5 + Math.random(),
    			origin = {
    				x: canvas.width / 2,
    				y: canvas.height - LandOffset
    			};

    		var mag = 100;

    		trees[i] = {
    			magnitude: mag,
    			branches: [create_branch(origin, mag, thickness, theta, l)]
    		};
    	}

    	function update(i) {
    		each(trees[i].branches, grow_branch, i);
    	}

    	function draw(ctx, i) {
    		each(trees[i].branches, function (branch, i) {
    			var w = branch.thickness;
    			var oX1 = branch.origin.x - w;
    			var oX2 = branch.origin.x + w;
    			var oY = branch.origin.y;
    			var tX1 = branch.tip.x - w * 0.8;
    			var tX2 = branch.tip.x + w * 0.8;
    			var tY = branch.tip.y;
    			var cpX1 = (oX1 + oX1 + tX1) / 3;
    			var cpY1 = (oY + tY + tY) / 3;
    			var cpX2 = (oX2 + oX2 + tX2) / 3;
    			var cpY2 = (oY + tY + tY) / 3;
    			ctx.beginPath();
    			ctx.moveTo(oX1, oY);
    			ctx.quadraticCurveTo(cpX1, cpY1, tX1, tY);
    			ctx.lineTo(tX2, tY);
    			ctx.quadraticCurveTo(cpX2, cpY2, oX2, oY);
    			ctx.lineWidth = 1;
    			ctx.fillStyle = hsl(branch.lightness);
    			ctx.fill();
    		});
    	}

    	function grow_branch(branch, i) {
    		if (branch.done) return;
    		var x = branch.tip.x - branch.origin.x;
    		var y = branch.tip.y - branch.origin.y;
    		var h = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    		if (h >= branch.magnitude) {
    			branch.done = true;
    			if (branch.magnitude < smallest_branch) return;
    			shoot(branch, i);
    			return;
    		}

    		branch.tip.x = branch.tip.x + Math.sin(branch.theta) * growth_rate;
    		branch.tip.y = branch.tip.y - Math.cos(branch.theta) * growth_rate;
    	}

    	function shoot(branch, i) {
    		if (branch.sprouts <= 0) return;
    		branch.sprouts -= 1;
    		shoot(branch, i);
    		var theta2 = branch.theta + (Math.random() * maximum_bend - maximum_bend / 2);
    		var magnitude2 = branch.magnitude * (Math.random() * 0.2 + 0.7);
    		var lightness2 = branch.lightness * 0.9;
    		trees[i].branches.push(create_branch({ x: branch.tip.x, y: branch.tip.y }, magnitude2, branch.thickness * 0.6, theta2, lightness2));
    	}

    	function loop(onFrame) {
    		var startDate = new Date();

    		for (let i = 0; i < trees.length; i++) {
    			update(i);
    			draw(ctx, i);
    			var endDate = new Date();
    			var duration = endDate - startDate;
    			avgTime += duration;
    		}

    		if ($season == "Fall") requestAnimationFrame(loop); else {
    			return;
    		}
    	}

    	onMount(async () => {
    		ctx = canvas.getContext('2d');
    		fps = 150;
    		ctx.lineCap = 'square';
    		plant_tree(0);
    		plant_tree(1);
    		plant_tree(2);
    		loop();
    	});

    	function toTop(i) {
    		return i - (canvasHeight - 40) / 2 * Scale / document.body.clientHeight * 100;
    	}

    	$$self.$$.on_mount.push(function () {
    		if (location === undefined && !('location' in $$props || $$self.$$.bound[$$self.$$.props['location']])) {
    			console.warn("<Tree> was created without expected prop 'location'");
    		}
    	});

    	const writable_props = ['location'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tree> was created with unknown prop '${key}'`);
    	});

    	function canvas_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			canvas = $$value;
    			$$invalidate(1, canvas);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('location' in $$props) $$invalidate(0, location = $$props.location);
    	};

    	$$self.$capture_state = () => ({
    		season,
    		onMount,
    		requestAnimationFrame,
    		location,
    		growth_rate,
    		maximum_bend,
    		smallest_branch,
    		hue,
    		fps,
    		canvas,
    		ctx,
    		avgTime,
    		frameCounter,
    		trackFrames,
    		canvasWidth,
    		canvasHeight,
    		Scale,
    		LandOffset,
    		trees,
    		StopTrigger,
    		each,
    		hsl,
    		plant_tree,
    		update,
    		draw,
    		grow_branch,
    		shoot,
    		create_branch,
    		loop,
    		toTop,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('requestAnimationFrame' in $$props) requestAnimationFrame = $$props.requestAnimationFrame;
    		if ('location' in $$props) $$invalidate(0, location = $$props.location);
    		if ('growth_rate' in $$props) growth_rate = $$props.growth_rate;
    		if ('maximum_bend' in $$props) maximum_bend = $$props.maximum_bend;
    		if ('smallest_branch' in $$props) smallest_branch = $$props.smallest_branch;
    		if ('hue' in $$props) hue = $$props.hue;
    		if ('fps' in $$props) fps = $$props.fps;
    		if ('canvas' in $$props) $$invalidate(1, canvas = $$props.canvas);
    		if ('ctx' in $$props) ctx = $$props.ctx;
    		if ('avgTime' in $$props) avgTime = $$props.avgTime;
    		if ('frameCounter' in $$props) frameCounter = $$props.frameCounter;
    		if ('trackFrames' in $$props) trackFrames = $$props.trackFrames;
    		if ('canvasWidth' in $$props) $$invalidate(2, canvasWidth = $$props.canvasWidth);
    		if ('canvasHeight' in $$props) $$invalidate(3, canvasHeight = $$props.canvasHeight);
    		if ('Scale' in $$props) $$invalidate(4, Scale = $$props.Scale);
    		if ('LandOffset' in $$props) LandOffset = $$props.LandOffset;
    		if ('trees' in $$props) trees = $$props.trees;
    		if ('StopTrigger' in $$props) StopTrigger = $$props.StopTrigger;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [location, canvas, canvasWidth, canvasHeight, Scale, toTop, canvas_1_binding];
    }

    class Tree extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$N, create_fragment$N, safe_not_equal, { location: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tree",
    			options,
    			id: create_fragment$N.name
    		});
    	}

    	get location() {
    		throw new Error("<Tree>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set location(value) {
    		throw new Error("<Tree>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Park.svelte generated by Svelte v3.55.1 */
    const file$M = "src\\component\\Park.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (37:4) {#each config as tree}
    function create_each_block$1(ctx) {
    	let tree;
    	let current;

    	tree = new Tree({
    			props: { location: /*tree*/ ctx[8].location },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tree.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tree, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tree_changes = {};
    			if (dirty & /*config*/ 1) tree_changes.location = /*tree*/ ctx[8].location;
    			tree.$set(tree_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tree.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tree.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tree, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(37:4) {#each config as tree}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$M(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let pre;
    	let t1;
    	let br;
    	let t2;
    	let b;
    	let t3;
    	let t4;
    	let t5;
    	let t6;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*config*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			div0 = element("div");
    			pre = element("pre");
    			t1 = text("        ");
    			br = element("br");
    			t2 = text("\r\n        ");
    			b = element("b");
    			t3 = text("\r\n            ");
    			t4 = text(/*$bench*/ ctx[1]);
    			t5 = text("\r\n        ");
    			t6 = text("\r\n        ");
    			add_location(br, file$M, 41, 8, 1189);
    			add_location(b, file$M, 42, 8, 1204);
    			add_location(pre, file$M, 40, 8, 1174);
    			attr_dev(div0, "class", "Bench svelte-1fw58m6");
    			set_style(div0, "top", "90%");
    			set_style(div0, "left", "20%");
    			add_location(div0, file$M, 39, 4, 1118);
    			attr_dev(div1, "class", "Park svelte-1fw58m6");
    			add_location(div1, file$M, 35, 0, 1011);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, pre);
    			append_dev(pre, t1);
    			append_dev(pre, br);
    			append_dev(pre, t2);
    			append_dev(pre, b);
    			append_dev(b, t3);
    			append_dev(b, t4);
    			append_dev(b, t5);
    			append_dev(pre, t6);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "mousedown", /*handleMouseDown*/ ctx[2], false, false, false),
    					listen_dev(window, "mousemove", /*handleMouseMove*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*config*/ 1) {
    				each_value = /*config*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, t0);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*$bench*/ 2) set_data_dev(t4, /*$bench*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$M.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$M($$self, $$props, $$invalidate) {
    	let $bench;
    	validate_store(bench, 'bench');
    	component_subscribe($$self, bench, $$value => $$invalidate(1, $bench = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Park', slots, []);
    	let mouse = [0, 0];
    	let pmouse = [0, 0];
    	let BenchRect;
    	let config = [];

    	function createConfig() {
    		return {
    			location: [mouse[0] / document.body.clientWidth * 100, 98]
    		};
    	}

    	function handleMouseDown() {
    		if (config.length < 10 && !(BenchRect.left - 50 <= mouse[0] && mouse[0] <= BenchRect.right + 50)) {
    			config.push(createConfig());
    			$$invalidate(0, config);
    		}
    	}

    	function handleMouseMove({ clientX, clientY }) {
    		mouse = [clientX, clientY];

    		pmouse = [
    			clientX * document.body.clientWidth / 100,
    			clientY * document.body.clientHeight / 100
    		];
    	}

    	onMount(() => {
    		BenchRect = document.getElementsByClassName('Bench')[0].getBoundingClientRect();
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Park> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		Tree,
    		bench,
    		mouse,
    		pmouse,
    		BenchRect,
    		config,
    		createConfig,
    		handleMouseDown,
    		handleMouseMove,
    		$bench
    	});

    	$$self.$inject_state = $$props => {
    		if ('mouse' in $$props) mouse = $$props.mouse;
    		if ('pmouse' in $$props) pmouse = $$props.pmouse;
    		if ('BenchRect' in $$props) BenchRect = $$props.BenchRect;
    		if ('config' in $$props) $$invalidate(0, config = $$props.config);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [config, $bench, handleMouseDown, handleMouseMove];
    }

    class Park extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$M, create_fragment$M, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Park",
    			options,
    			id: create_fragment$M.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\defaultSlide.svelte generated by Svelte v3.55.1 */

    const file$L = "src\\component\\PageDesign\\Slide\\defaultSlide.svelte";

    function create_fragment$L(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-cjm4sg");
    			add_location(div, file$L, 3, 0, 23);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$L.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$L($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DefaultSlide', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DefaultSlide> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class DefaultSlide extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$L, create_fragment$L, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DefaultSlide",
    			options,
    			id: create_fragment$L.name
    		});
    	}
    }

    function hslide(node, {
    	delay = 0,
    	duration = 120,
    	easing = cubicOut
    })  {
    	const style = getComputedStyle(node);
    	const opacity = +style.opacity;
    	const width = parseFloat(style.width);
    	const padding_left = parseFloat(style.paddingLeft);
    	const padding_right = parseFloat(style.paddingRight);
    	const margin_left = parseFloat(style.marginLeft);
    	const margin_right = parseFloat(style.marginRight);
    	const border_left_width = parseFloat(style.borderLeftWidth);
    	const border_right_width = parseFloat(style.borderRightWidth);

    	return {
    		delay,
    		duration,
    		easing,
    		css: t =>
    			`overflow: hidden;` +
    			`opacity: ${Math.min(t * 20, 1) * opacity};` +
    			`width: ${t * width}px;` +
    			`padding-left: ${t * padding_left}px;` +
    			`padding-right: ${t * padding_right}px;` +
    			`margin-left: ${t * margin_left}px;` +
    			`margin-right: ${t * margin_right}px;` +
    			`border-left-width: ${t * border_left_width}px;` +
    			`border-right-width: ${t * border_right_width}px;`
    	};
    }

    /* src\component\PageDesign\DefaultPage.svelte generated by Svelte v3.55.1 */
    const file$K = "src\\component\\PageDesign\\DefaultPage.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[14] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[16] = i;
    	return child_ctx;
    }

    // (65:12) {#if id === cur}
    function create_if_block$1(ctx) {
    	let div;
    	let switch_instance;
    	let t_1;
    	let div_intro;
    	let div_outro;
    	let current;
    	var switch_value = /*slide*/ ctx[12].childComponent;

    	function switch_props(ctx) {
    		return {
    			props: { color: /*slide*/ ctx[12].color },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t_1 = space();
    			set_style(div, "background", /*slide*/ ctx[12].bg);
    			attr_dev(div, "class", "slide svelte-108mhzz");
    			add_location(div, file$K, 65, 12, 1775);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (switch_instance) mount_component(switch_instance, div, null);
    			append_dev(div, t_1);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const switch_instance_changes = {};
    			if (dirty & /*slides*/ 1) switch_instance_changes.color = /*slide*/ ctx[12].color;

    			if (switch_value !== (switch_value = /*slide*/ ctx[12].childComponent)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, t_1);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}

    			if (!current || dirty & /*slides*/ 1) {
    				set_style(div, "background", /*slide*/ ctx[12].bg);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, hslide, /*transition_args*/ ctx[5]);
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, hslide, /*transition_args*/ ctx[5]);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(65:12) {#if id === cur}",
    		ctx
    	});

    	return block;
    }

    // (64:8) {#each slides as slide, id}
    function create_each_block_1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*id*/ ctx[16] === /*cur*/ ctx[2] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$3();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*id*/ ctx[16] === /*cur*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*cur*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(64:8) {#each slides as slide, id}",
    		ctx
    	});

    	return block;
    }

    // (79:12) {#each slides as slide, i}
    function create_each_block(ctx) {
    	let button;
    	let t_1_value = /*i*/ ctx[14] + 1 + "";
    	let t_1;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[7](/*i*/ ctx[14]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			t_1 = text(t_1_value);
    			attr_dev(button, "class", "dot svelte-108mhzz");
    			toggle_class(button, "selected", /*cur*/ ctx[2] == /*i*/ ctx[14]);
    			add_location(button, file$K, 79, 16, 2250);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t_1);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*cur*/ 4) {
    				toggle_class(button, "selected", /*cur*/ ctx[2] == /*i*/ ctx[14]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(79:12) {#each slides as slide, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$K(ctx) {
    	let div3;
    	let div0;
    	let t_1;
    	let div2;
    	let div1;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*slides*/ ctx[0];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value = /*slides*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t_1 = space();
    			div2 = element("div");
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "inner-wrapper svelte-108mhzz");
    			add_location(div0, file$K, 62, 4, 1643);
    			attr_dev(div1, "class", "dots svelte-108mhzz");
    			add_location(div1, file$K, 77, 8, 2174);
    			attr_dev(div2, "class", "footer svelte-108mhzz");
    			add_location(div2, file$K, 76, 4, 2144);
    			attr_dev(div3, "class", "Page svelte-108mhzz");
    			set_style(div3, "background", /*background*/ ctx[1][/*$season*/ ctx[3]]);
    			add_location(div3, file$K, 61, 0, 1573);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			append_dev(div3, t_1);
    			append_dev(div3, div2);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div0, "mousewheel", /*onWheel*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*slides, transition_args, cur*/ 37) {
    				each_value_1 = /*slides*/ ctx[0];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*cur, changeSlide, slides*/ 21) {
    				each_value = /*slides*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (!current || dirty & /*background, $season*/ 10) {
    				set_style(div3, "background", /*background*/ ctx[1][/*$season*/ ctx[3]]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$K.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$K($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(3, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DefaultPage', slots, []);
    	let background = [];

    	function changeSlide(slide) {
    		$$invalidate(2, cur = slide);
    	}

    	let { slides = [
    		{
    			childComponent: DefaultSlide,
    			bg: 'transparent',
    			color: '#fff'
    		},
    		{
    			childComponent: DefaultSlide,
    			bg: 'transparent',
    			color: '#fff'
    		},
    		{
    			childComponent: DefaultSlide,
    			bg: 'transparent',
    			color: '#fff'
    		},
    		{
    			childComponent: DefaultSlide,
    			bg: 'transparent',
    			color: '#fff'
    		}
    	] } = $$props;

    	let cur = 0;
    	let t;
    	let enbleToMove = true;
    	const transition_args = { duration: 200 };

    	function prev(e) {
    		$$invalidate(2, cur = $$invalidate(2, --cur) >= 0 ? cur : slides.length - 1);
    	}

    	function next(e) {
    		$$invalidate(2, cur = $$invalidate(2, ++cur) % slides.length);
    	}

    	onMount(() => {
    		// background['Spring'] = "#fff";
    		// background['Summer'] = "#fff";
    		// background['Fall'] = "rgba(168, 168, 168, 0.692)";
    		// background['Winter'] = "rgba(168, 168, 168, 0.692)"
    		$$invalidate(1, background['Spring'] = "transparent", background);

    		$$invalidate(1, background['Summer'] = "transparent", background);
    		$$invalidate(1, background['Fall'] = "transparent", background);
    		$$invalidate(1, background['Winter'] = "transparent", background);
    	});

    	function onWheel(e) {
    		if (enbleToMove) {
    			if (e.deltaY < 0) {
    				prev();
    			} else {
    				next();
    			}

    			enbleToMove = false;
    			clearTimeout(t);

    			t = setTimeout(
    				() => {
    					enbleToMove = true;
    				},
    				300
    			);
    		}
    	}

    	const writable_props = ['slides'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DefaultPage> was created with unknown prop '${key}'`);
    	});

    	const click_handler = i => changeSlide(i);

    	$$self.$$set = $$props => {
    		if ('slides' in $$props) $$invalidate(0, slides = $$props.slides);
    	};

    	$$self.$capture_state = () => ({
    		DefaultSlide,
    		hslide,
    		season,
    		onMount,
    		background,
    		changeSlide,
    		slides,
    		cur,
    		t,
    		enbleToMove,
    		transition_args,
    		prev,
    		next,
    		onWheel,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('background' in $$props) $$invalidate(1, background = $$props.background);
    		if ('slides' in $$props) $$invalidate(0, slides = $$props.slides);
    		if ('cur' in $$props) $$invalidate(2, cur = $$props.cur);
    		if ('t' in $$props) t = $$props.t;
    		if ('enbleToMove' in $$props) enbleToMove = $$props.enbleToMove;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		slides,
    		background,
    		cur,
    		$season,
    		changeSlide,
    		transition_args,
    		onWheel,
    		click_handler
    	];
    }

    class DefaultPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$K, create_fragment$K, safe_not_equal, { slides: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DefaultPage",
    			options,
    			id: create_fragment$K.name
    		});
    	}

    	get slides() {
    		throw new Error("<DefaultPage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set slides(value) {
    		throw new Error("<DefaultPage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Main\Slide01.svelte generated by Svelte v3.55.1 */
    const file$J = "src\\component\\PageDesign\\Slide\\Main\\Slide01.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$z(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Main Slide 01";
    			add_location(p, file$J, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$J, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$z.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$J(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$z] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$J.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$J($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide01', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide01> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide01> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide01$8 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$J, create_fragment$J, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$J.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide01>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide01>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Main\Slide02.svelte generated by Svelte v3.55.1 */
    const file$I = "src\\component\\PageDesign\\Slide\\Main\\Slide02.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$y(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Main Slide 02";
    			add_location(p, file$I, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$I, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$y.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$I(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$y] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$I.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$I($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide02', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide02> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide02> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide02$8 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$I, create_fragment$I, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$I.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide02>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide02>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Main\Slide03.svelte generated by Svelte v3.55.1 */
    const file$H = "src\\component\\PageDesign\\Slide\\Main\\Slide03.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$x(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Main Slide 03";
    			add_location(p, file$H, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$H, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$x.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$H(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$x] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$H.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$H($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide03', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide03> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide03> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide03$8 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$H, create_fragment$H, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$H.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide03>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide03>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Main\Slide04.svelte generated by Svelte v3.55.1 */
    const file$G = "src\\component\\PageDesign\\Slide\\Main\\Slide04.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$w(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Main Slide 04";
    			add_location(p, file$G, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$G, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$w.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$G(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$w] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$G.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$G($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide04', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide04> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide04> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide04$8 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$G, create_fragment$G, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$G.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide04>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide04>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\routes\Main.svelte generated by Svelte v3.55.1 */
    const file$F = "src\\component\\routes\\Main.svelte";

    function create_fragment$F(ctx) {
    	let div;
    	let defaultpage;
    	let div_intro;
    	let div_outro;
    	let current;

    	defaultpage = new DefaultPage({
    			props: {
    				slides: [
    					{
    						childComponent: Slide01$8,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide02$8,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide03$8,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide04$8,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$F, 23, 0, 743);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(defaultpage, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultpage_changes = {};

    			if (dirty & /*$season*/ 1) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$8,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide02$8,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide03$8,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide04$8,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				}
    			];

    			defaultpage.$set(defaultpage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultpage.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, { delay: 200, duration: 200 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultpage.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(defaultpage);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$F.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$F($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(0, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main', slots, []);

    	let foreColor = {
    		"Spring": "#000",
    		"Summer": "#000",
    		"Fall": "#fff",
    		"Winter": "#fff"
    	};

    	let backColor = {
    		"Summer": "transparent",
    		"Spring": "transparent",
    		"Fall": "transparent",
    		"Winter": "transparent"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		DefaultPage,
    		Slide01: Slide01$8,
    		Slide02: Slide02$8,
    		Slide03: Slide03$8,
    		Slide04: Slide04$8,
    		fade,
    		foreColor,
    		backColor,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('foreColor' in $$props) $$invalidate(1, foreColor = $$props.foreColor);
    		if ('backColor' in $$props) $$invalidate(2, backColor = $$props.backColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$season, foreColor, backColor];
    }

    class Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$F, create_fragment$F, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main",
    			options,
    			id: create_fragment$F.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\Profile\Slide01.svelte generated by Svelte v3.55.1 */
    const file$E = "src\\component\\PageDesign\\Slide\\Profile\\Slide01.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$v(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Profile Slide 01";
    			add_location(p, file$E, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$E, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$v.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$E(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$v] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$E.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$E($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide01', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide01> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide01> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide01$7 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$E, create_fragment$E, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$E.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide01>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide01>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Profile\Slide02.svelte generated by Svelte v3.55.1 */
    const file$D = "src\\component\\PageDesign\\Slide\\Profile\\Slide02.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$u(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Profile Slide 02";
    			add_location(p, file$D, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$D, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$u.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$D(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$u] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$D($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide02', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide02> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide02> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide02$7 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$D, create_fragment$D, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$D.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide02>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide02>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Profile\Slide03.svelte generated by Svelte v3.55.1 */
    const file$C = "src\\component\\PageDesign\\Slide\\Profile\\Slide03.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$t(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Profile Slide 03";
    			add_location(p, file$C, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$C, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$t.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$C(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$t] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide03', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide03> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide03> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide03$7 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$C, create_fragment$C, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$C.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide03>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide03>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Profile\Slide04.svelte generated by Svelte v3.55.1 */
    const file$B = "src\\component\\PageDesign\\Slide\\Profile\\Slide04.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$s(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Profile Slide 04";
    			add_location(p, file$B, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$B, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$s.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$B(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$s] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$B.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$B($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide04', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide04> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide04> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide04$7 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$B, create_fragment$B, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$B.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide04>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide04>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\routes\Profile.svelte generated by Svelte v3.55.1 */
    const file$A = "src\\component\\routes\\Profile.svelte";

    function create_fragment$A(ctx) {
    	let div;
    	let defaultpage;
    	let div_intro;
    	let div_outro;
    	let current;

    	defaultpage = new DefaultPage({
    			props: {
    				slides: [
    					{
    						childComponent: Slide01$7,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide02$7,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide03$7,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide04$7,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$A, 23, 0, 753);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(defaultpage, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultpage_changes = {};

    			if (dirty & /*$season*/ 1) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$7,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide02$7,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide03$7,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide04$7,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				}
    			];

    			defaultpage.$set(defaultpage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultpage.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, { delay: 200, duration: 200 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultpage.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(defaultpage);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(0, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Profile', slots, []);

    	let foreColor = {
    		"Spring": "#000",
    		"Summer": "#000",
    		"Fall": "#fff",
    		"Winter": "#fff"
    	};

    	let backColor = {
    		"Summer": "transparent",
    		"Spring": "transparent",
    		"Fall": "transparent",
    		"Winter": "transparent"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Profile> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		fade,
    		DefaultPage,
    		Slide01: Slide01$7,
    		Slide02: Slide02$7,
    		Slide03: Slide03$7,
    		Slide04: Slide04$7,
    		foreColor,
    		backColor,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('foreColor' in $$props) $$invalidate(1, foreColor = $$props.foreColor);
    		if ('backColor' in $$props) $$invalidate(2, backColor = $$props.backColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$season, foreColor, backColor];
    }

    class Profile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Profile",
    			options,
    			id: create_fragment$A.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\Projects\Slide01.svelte generated by Svelte v3.55.1 */
    const file$z = "src\\component\\PageDesign\\Slide\\Projects\\Slide01.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$r(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Project Slide 01";
    			add_location(p, file$z, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$z, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$r.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$z(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$r] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide01', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide01> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide01> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide01$6 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$z.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide01>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide01>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\Slide02.svelte generated by Svelte v3.55.1 */
    const file$y = "src\\component\\PageDesign\\Slide\\Projects\\Slide02.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$q(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Project Slide 02";
    			add_location(p, file$y, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$y, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$q.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$y(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$q] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide02', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide02> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide02> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide02$6 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$y, create_fragment$y, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$y.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide02>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide02>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\Slide03.svelte generated by Svelte v3.55.1 */
    const file$x = "src\\component\\PageDesign\\Slide\\Projects\\Slide03.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$p(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Project Slide 03";
    			add_location(p, file$x, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$x, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$p.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$x(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$p] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide03', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide03> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide03> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide03$6 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$x, create_fragment$x, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$x.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide03>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide03>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\Slide04.svelte generated by Svelte v3.55.1 */
    const file$w = "src\\component\\PageDesign\\Slide\\Projects\\Slide04.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$o(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Project Slide 04";
    			add_location(p, file$w, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$w, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$o.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$w(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$o] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide04', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide04> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide04> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide04$6 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$w.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide04>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide04>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\routes\Projects.svelte generated by Svelte v3.55.1 */
    const file$v = "src\\component\\routes\\Projects.svelte";

    function create_fragment$v(ctx) {
    	let div;
    	let defaultpage;
    	let div_intro;
    	let div_outro;
    	let current;

    	defaultpage = new DefaultPage({
    			props: {
    				slides: [
    					{
    						childComponent: Slide01$6,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide02$6,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide03$6,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide04$6,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$v, 23, 0, 759);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(defaultpage, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultpage_changes = {};

    			if (dirty & /*$season*/ 1) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$6,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide02$6,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide03$6,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide04$6,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				}
    			];

    			defaultpage.$set(defaultpage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultpage.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, { delay: 200, duration: 200 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultpage.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(defaultpage);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(0, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);

    	let foreColor = {
    		"Spring": "#000",
    		"Summer": "#000",
    		"Fall": "#fff",
    		"Winter": "#fff"
    	};

    	let backColor = {
    		"Summer": "transparent",
    		"Spring": "transparent",
    		"Fall": "transparent",
    		"Winter": "transparent"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		DefaultPage,
    		Slide01: Slide01$6,
    		Slide02: Slide02$6,
    		Slide03: Slide03$6,
    		Slide04: Slide04$6,
    		fade,
    		foreColor,
    		backColor,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('foreColor' in $$props) $$invalidate(1, foreColor = $$props.foreColor);
    		if ('backColor' in $$props) $$invalidate(2, backColor = $$props.backColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$season, foreColor, backColor];
    }

    class Projects$3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$v.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\Slide01.svelte generated by Svelte v3.55.1 */
    const file$u = "src\\component\\PageDesign\\Slide\\Outsourcing\\Slide01.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$n(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Outsourcing Slide 01";
    			add_location(p, file$u, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$u, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$n.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$u(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$n] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide01', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide01> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide01> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide01$5 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$u, create_fragment$u, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$u.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide01>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide01>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\Slide02.svelte generated by Svelte v3.55.1 */
    const file$t = "src\\component\\PageDesign\\Slide\\Outsourcing\\Slide02.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$m(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Outsourcing Slide 02";
    			add_location(p, file$t, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$t, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$m.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$t(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$m] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide02', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide02> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide02> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide02$5 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$t, create_fragment$t, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$t.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide02>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide02>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\Slide03.svelte generated by Svelte v3.55.1 */
    const file$s = "src\\component\\PageDesign\\Slide\\Outsourcing\\Slide03.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$l(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Outsourcing Slide 03";
    			add_location(p, file$s, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$s, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$l.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$s(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$l] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide03', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide03> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide03> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide03$5 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$s.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide03>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide03>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\Slide04.svelte generated by Svelte v3.55.1 */
    const file$r = "src\\component\\PageDesign\\Slide\\Outsourcing\\Slide04.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$k(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Outsourcing Slide 04";
    			add_location(p, file$r, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$r, 6, 4, 121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$k.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$k] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide04', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide04> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide04> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide04$5 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$r.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide04>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide04>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\routes\Outsourcing.svelte generated by Svelte v3.55.1 */
    const file$q = "src\\component\\routes\\Outsourcing.svelte";

    function create_fragment$q(ctx) {
    	let div;
    	let defaultpage;
    	let div_intro;
    	let div_outro;
    	let current;

    	defaultpage = new DefaultPage({
    			props: {
    				slides: [
    					{
    						childComponent: Slide01$5,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide02$5,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide03$5,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide04$5,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$q, 23, 0, 771);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(defaultpage, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultpage_changes = {};

    			if (dirty & /*$season*/ 1) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$5,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide02$5,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide03$5,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide04$5,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				}
    			];

    			defaultpage.$set(defaultpage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultpage.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, { delay: 200, duration: 200 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultpage.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(defaultpage);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(0, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Outsourcing', slots, []);

    	let foreColor = {
    		"Spring": "#000",
    		"Summer": "#000",
    		"Fall": "#fff",
    		"Winter": "#fff"
    	};

    	let backColor = {
    		"Summer": "transparent",
    		"Spring": "transparent",
    		"Fall": "transparent",
    		"Winter": "transparent"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Outsourcing> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		DefaultPage,
    		Slide01: Slide01$5,
    		Slide02: Slide02$5,
    		Slide03: Slide03$5,
    		Slide04: Slide04$5,
    		fade,
    		foreColor,
    		backColor,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('foreColor' in $$props) $$invalidate(1, foreColor = $$props.foreColor);
    		if ('backColor' in $$props) $$invalidate(2, backColor = $$props.backColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$season, foreColor, backColor];
    }

    class Outsourcing$2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Outsourcing",
    			options,
    			id: create_fragment$q.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2021\Slide01.svelte generated by Svelte v3.55.1 */
    const file$p = "src\\component\\PageDesign\\Slide\\Projects\\2021\\Slide01.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$j(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2021 Projects Slide 01";
    			add_location(p, file$p, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$p, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$j.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$j] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide01', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide01> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide01> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide01$4 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide01>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide01>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2021\Slide02.svelte generated by Svelte v3.55.1 */
    const file$o = "src\\component\\PageDesign\\Slide\\Projects\\2021\\Slide02.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$i(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2021 Projects Slide 02";
    			add_location(p, file$o, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$o, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$i.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$i] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide02', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide02> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide02> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide02$4 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide02>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide02>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2021\Slide03.svelte generated by Svelte v3.55.1 */
    const file$n = "src\\component\\PageDesign\\Slide\\Projects\\2021\\Slide03.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$h(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2021 Projects Slide 03";
    			add_location(p, file$n, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$n, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$h.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$n(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$h] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide03', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide03> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide03> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide03$4 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$n.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide03>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide03>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2021\Slide04.svelte generated by Svelte v3.55.1 */
    const file$m = "src\\component\\PageDesign\\Slide\\Projects\\2021\\Slide04.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$g(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2021 Projects Slide 04";
    			add_location(p, file$m, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$m, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$g.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$g] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide04', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide04> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide04> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide04$4 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide04>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide04>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\routes\2021\Projects.svelte generated by Svelte v3.55.1 */
    const file$l = "src\\component\\routes\\2021\\Projects.svelte";

    function create_fragment$l(ctx) {
    	let div;
    	let defaultpage;
    	let div_intro;
    	let div_outro;
    	let current;

    	defaultpage = new DefaultPage({
    			props: {
    				slides: [
    					{
    						childComponent: Slide01$4,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide02$4,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide03$4,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide04$4,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$l, 23, 0, 795);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(defaultpage, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultpage_changes = {};

    			if (dirty & /*$season*/ 1) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$4,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide02$4,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide03$4,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide04$4,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				}
    			];

    			defaultpage.$set(defaultpage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultpage.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, { delay: 200, duration: 200 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultpage.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(defaultpage);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(0, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);

    	let foreColor = {
    		"Spring": "#000",
    		"Summer": "#000",
    		"Fall": "#fff",
    		"Winter": "#fff"
    	};

    	let backColor = {
    		"Summer": "transparent",
    		"Spring": "transparent",
    		"Fall": "transparent",
    		"Winter": "transparent"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		fade,
    		DefaultPage,
    		Slide01: Slide01$4,
    		Slide02: Slide02$4,
    		Slide03: Slide03$4,
    		Slide04: Slide04$4,
    		foreColor,
    		backColor,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('foreColor' in $$props) $$invalidate(1, foreColor = $$props.foreColor);
    		if ('backColor' in $$props) $$invalidate(2, backColor = $$props.backColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$season, foreColor, backColor];
    }

    class Projects$2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2022\Slide01.svelte generated by Svelte v3.55.1 */
    const file$k = "src\\component\\PageDesign\\Slide\\Projects\\2022\\Slide01.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$f(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2022 Projects Slide 01";
    			add_location(p, file$k, 7, 8, 178);
    			attr_dev(div, "class", "context");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$k, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$f.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$f] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide01', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide01> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide01> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide01$3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$k.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide01>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide01>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2022\Slide02.svelte generated by Svelte v3.55.1 */
    const file$j = "src\\component\\PageDesign\\Slide\\Projects\\2022\\Slide02.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$e(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2022 Projects Slide 02";
    			add_location(p, file$j, 7, 8, 178);
    			attr_dev(div, "class", "context");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$j, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$e.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$e] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide02', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide02> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide02> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide02$3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide02>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide02>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2022\Slide03.svelte generated by Svelte v3.55.1 */
    const file$i = "src\\component\\PageDesign\\Slide\\Projects\\2022\\Slide03.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$d(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2022 Projects Slide 03";
    			add_location(p, file$i, 7, 8, 178);
    			attr_dev(div, "class", "context");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$i, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$d.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$d] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide03', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide03> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide03> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide03$3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide03>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide03>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2022\Slide04.svelte generated by Svelte v3.55.1 */
    const file$h = "src\\component\\PageDesign\\Slide\\Projects\\2022\\Slide04.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$c(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2022 Projects Slide 04";
    			add_location(p, file$h, 7, 8, 178);
    			attr_dev(div, "class", "context");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$h, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$c.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$c] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide04', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide04> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide04> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide04$3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide04>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide04>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\routes\2022\Projects.svelte generated by Svelte v3.55.1 */
    const file$g = "src\\component\\routes\\2022\\Projects.svelte";

    function create_fragment$g(ctx) {
    	let div;
    	let defaultpage;
    	let div_intro;
    	let div_outro;
    	let current;

    	defaultpage = new DefaultPage({
    			props: {
    				slides: [
    					{
    						childComponent: Slide01$3,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide02$3,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide03$3,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide04$3,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$g, 23, 0, 795);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(defaultpage, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultpage_changes = {};

    			if (dirty & /*$season*/ 1) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$3,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide02$3,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide03$3,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide04$3,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				}
    			];

    			defaultpage.$set(defaultpage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultpage.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, { delay: 200, duration: 200 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultpage.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(defaultpage);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(0, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);

    	let foreColor = {
    		"Spring": "#000",
    		"Summer": "#000",
    		"Fall": "#fff",
    		"Winter": "#fff"
    	};

    	let backColor = {
    		"Summer": "transparent",
    		"Spring": "transparent",
    		"Fall": "transparent",
    		"Winter": "transparent"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		fade,
    		DefaultPage,
    		Slide01: Slide01$3,
    		Slide02: Slide02$3,
    		Slide03: Slide03$3,
    		Slide04: Slide04$3,
    		foreColor,
    		backColor,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('foreColor' in $$props) $$invalidate(1, foreColor = $$props.foreColor);
    		if ('backColor' in $$props) $$invalidate(2, backColor = $$props.backColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$season, foreColor, backColor];
    }

    class Projects$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2023\Slide01.svelte generated by Svelte v3.55.1 */
    const file$f = "src\\component\\PageDesign\\Slide\\Projects\\2023\\Slide01.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$b(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2023 Projects Slide 01";
    			add_location(p, file$f, 7, 8, 178);
    			attr_dev(div, "class", "context");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$f, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$b.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$b] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide01', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide01> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide01> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide01$2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide01>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide01>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2023\Slide02.svelte generated by Svelte v3.55.1 */
    const file$e = "src\\component\\PageDesign\\Slide\\Projects\\2023\\Slide02.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$a(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2023 Projects Slide 02";
    			add_location(p, file$e, 7, 8, 178);
    			attr_dev(div, "class", "context");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$e, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$a.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$a] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide02', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide02> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide02> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide02$2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide02>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide02>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2023\Slide03.svelte generated by Svelte v3.55.1 */
    const file$d = "src\\component\\PageDesign\\Slide\\Projects\\2023\\Slide03.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$9(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2023 Projects Slide 03";
    			add_location(p, file$d, 7, 8, 178);
    			attr_dev(div, "class", "context");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$d, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$9.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide03', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide03> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide03> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide03$2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide03>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide03>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Projects\2023\Slide04.svelte generated by Svelte v3.55.1 */
    const file$c = "src\\component\\PageDesign\\Slide\\Projects\\2023\\Slide04.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$8(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2023 Projects Slide 04";
    			add_location(p, file$c, 7, 8, 178);
    			attr_dev(div, "class", "context");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$c, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$8.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide04', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide04> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide04> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide04$2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide04>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide04>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\routes\2023\Projects.svelte generated by Svelte v3.55.1 */
    const file$b = "src\\component\\routes\\2023\\Projects.svelte";

    function create_fragment$b(ctx) {
    	let div;
    	let defaultpage;
    	let div_intro;
    	let div_outro;
    	let current;

    	defaultpage = new DefaultPage({
    			props: {
    				slides: [
    					{
    						childComponent: Slide01$2,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide02$2,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide03$2,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide04$2,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$b, 22, 0, 793);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(defaultpage, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultpage_changes = {};

    			if (dirty & /*$season*/ 1) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$2,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide02$2,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide03$2,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide04$2,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				}
    			];

    			defaultpage.$set(defaultpage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultpage.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, { delay: 200, duration: 200 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultpage.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(defaultpage);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(0, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);

    	let foreColor = {
    		"Spring": "#000",
    		"Summer": "#000",
    		"Fall": "#fff",
    		"Winter": "#fff"
    	};

    	let backColor = {
    		"Summer": "transparent",
    		"Spring": "transparent",
    		"Fall": "transparent",
    		"Winter": "transparent"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		fade,
    		DefaultPage,
    		Slide01: Slide01$2,
    		Slide02: Slide02$2,
    		Slide03: Slide03$2,
    		Slide04: Slide04$2,
    		foreColor,
    		backColor,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('foreColor' in $$props) $$invalidate(1, foreColor = $$props.foreColor);
    		if ('backColor' in $$props) $$invalidate(2, backColor = $$props.backColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$season, foreColor, backColor];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\2022\Slide01.svelte generated by Svelte v3.55.1 */
    const file$a = "src\\component\\PageDesign\\Slide\\Outsourcing\\2022\\Slide01.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$7(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2022 Outsourcing Slide 01";
    			add_location(p, file$a, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$a, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide01', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide01> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide01> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide01$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide01>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide01>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\2022\Slide02.svelte generated by Svelte v3.55.1 */
    const file$9 = "src\\component\\PageDesign\\Slide\\Outsourcing\\2022\\Slide02.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$6(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2022 Outsourcing Slide 02";
    			add_location(p, file$9, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$9, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide02', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide02> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide02> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide02$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide02>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide02>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\2022\Slide03.svelte generated by Svelte v3.55.1 */
    const file$8 = "src\\component\\PageDesign\\Slide\\Outsourcing\\2022\\Slide03.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$5(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2022 Outsourcing Slide 03";
    			add_location(p, file$8, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$8, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide03', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide03> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide03> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide03$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide03>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide03>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\2022\Slide04.svelte generated by Svelte v3.55.1 */
    const file$7 = "src\\component\\PageDesign\\Slide\\Outsourcing\\2022\\Slide04.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$4(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2022 Outsourcing Slide 01";
    			add_location(p, file$7, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$7, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide04', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide04> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide04> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide04$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide04>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide04>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\routes\2022\Outsourcing.svelte generated by Svelte v3.55.1 */
    const file$6 = "src\\component\\routes\\2022\\Outsourcing.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let defaultpage;
    	let div_intro;
    	let div_outro;
    	let current;

    	defaultpage = new DefaultPage({
    			props: {
    				slides: [
    					{
    						childComponent: Slide01$1,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide02$1,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide03$1,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide04$1,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$6, 22, 0, 805);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(defaultpage, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultpage_changes = {};

    			if (dirty & /*$season*/ 1) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$1,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide02$1,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide03$1,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide04$1,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				}
    			];

    			defaultpage.$set(defaultpage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultpage.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, { delay: 200, duration: 200 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultpage.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(defaultpage);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(0, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Outsourcing', slots, []);

    	let foreColor = {
    		"Spring": "#000",
    		"Summer": "#000",
    		"Fall": "#fff",
    		"Winter": "#fff"
    	};

    	let backColor = {
    		"Summer": "transparent",
    		"Spring": "transparent",
    		"Fall": "transparent",
    		"Winter": "transparent"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Outsourcing> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		fade,
    		DefaultPage,
    		Slide01: Slide01$1,
    		Slide02: Slide02$1,
    		Slide03: Slide03$1,
    		Slide04: Slide04$1,
    		foreColor,
    		backColor,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('foreColor' in $$props) $$invalidate(1, foreColor = $$props.foreColor);
    		if ('backColor' in $$props) $$invalidate(2, backColor = $$props.backColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$season, foreColor, backColor];
    }

    class Outsourcing$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Outsourcing",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\2023\Slide01.svelte generated by Svelte v3.55.1 */
    const file$5 = "src\\component\\PageDesign\\Slide\\Outsourcing\\2023\\Slide01.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$3(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2023 Outsourcing Slide 01";
    			add_location(p, file$5, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$5, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide01', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide01> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide01> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide01 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide01>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide01>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\2023\Slide02.svelte generated by Svelte v3.55.1 */
    const file$4 = "src\\component\\PageDesign\\Slide\\Outsourcing\\2023\\Slide02.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$2(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2023 Outsourcing Slide 02";
    			add_location(p, file$4, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$4, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide02', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide02> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide02> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide02 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide02>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide02>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\2023\Slide03.svelte generated by Svelte v3.55.1 */
    const file$3 = "src\\component\\PageDesign\\Slide\\Outsourcing\\2023\\Slide03.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$1(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2023 Outsourcing Slide 03";
    			add_location(p, file$3, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$3, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide03', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide03> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide03> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide03 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide03>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide03>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\2023\Slide04.svelte generated by Svelte v3.55.1 */
    const file$2 = "src\\component\\PageDesign\\Slide\\Outsourcing\\2023\\Slide04.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2023 Outsourcing Slide 04";
    			add_location(p, file$2, 7, 8, 178);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$2, 6, 4, 124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(6:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let defaultslide;
    	let current;

    	defaultslide = new DefaultSlide({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(defaultslide.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(defaultslide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultslide_changes = {};

    			if (dirty & /*$$scope, color*/ 3) {
    				defaultslide_changes.$$scope = { dirty, ctx };
    			}

    			defaultslide.$set(defaultslide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultslide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultslide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(defaultslide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide04', slots, []);
    	let { color } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide04> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide04> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ DefaultSlide, color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Slide04 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide04>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide04>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\routes\2023\Outsourcing.svelte generated by Svelte v3.55.1 */
    const file$1 = "src\\component\\routes\\2023\\Outsourcing.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let defaultpage;
    	let div_intro;
    	let div_outro;
    	let current;

    	defaultpage = new DefaultPage({
    			props: {
    				slides: [
    					{
    						childComponent: Slide01,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide02,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide03,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					},
    					{
    						childComponent: Slide04,
    						bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    						color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$1, 22, 0, 805);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(defaultpage, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const defaultpage_changes = {};

    			if (dirty & /*$season*/ 1) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide02,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide03,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				},
    				{
    					childComponent: Slide04,
    					bg: /*backColor*/ ctx[2][/*$season*/ ctx[0]],
    					color: /*foreColor*/ ctx[1][/*$season*/ ctx[0]]
    				}
    			];

    			defaultpage.$set(defaultpage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(defaultpage.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, { delay: 200, duration: 200 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(defaultpage.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(defaultpage);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $season;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(0, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Outsourcing', slots, []);

    	let foreColor = {
    		"Spring": "#000",
    		"Summer": "#000",
    		"Fall": "#fff",
    		"Winter": "#fff"
    	};

    	let backColor = {
    		"Summer": "transparent",
    		"Spring": "transparent",
    		"Fall": "transparent",
    		"Winter": "transparent"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Outsourcing> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		season,
    		fade,
    		DefaultPage,
    		Slide01,
    		Slide02,
    		Slide03,
    		Slide04,
    		foreColor,
    		backColor,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('foreColor' in $$props) $$invalidate(1, foreColor = $$props.foreColor);
    		if ('backColor' in $$props) $$invalidate(2, backColor = $$props.backColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$season, foreColor, backColor];
    }

    class Outsourcing extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Outsourcing",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.55.1 */
    const file = "src\\App.svelte";

    // (124:2) {:else}
    function create_else_block(ctx) {
    	let snowflakes;
    	let current;
    	snowflakes = new Snowflakes({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(snowflakes.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(snowflakes, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(snowflakes.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(snowflakes.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(snowflakes, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(124:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (122:30) 
    function create_if_block_3(ctx) {
    	let park;
    	let current;
    	park = new Park({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(park.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(park, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(park.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(park.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(park, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(122:30) ",
    		ctx
    	});

    	return block;
    }

    // (120:32) 
    function create_if_block_2(ctx) {
    	let lake;
    	let current;
    	lake = new Lake({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(lake.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(lake, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(lake.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(lake.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(lake, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(120:32) ",
    		ctx
    	});

    	return block;
    }

    // (118:2) {#if $season == "Spring"}
    function create_if_block_1(ctx) {
    	let sakuraflakes;
    	let current;
    	sakuraflakes = new Sakura({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(sakuraflakes.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sakuraflakes, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sakuraflakes.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sakuraflakes.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sakuraflakes, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(118:2) {#if $season == \\\"Spring\\\"}",
    		ctx
    	});

    	return block;
    }

    // (127:2) {#if $ContextVisible}
    function create_if_block(ctx) {
    	let div;
    	let router;
    	let current;

    	router = new Router({
    			props: { routes: /*routes*/ ctx[4] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(router.$$.fragment);
    			attr_dev(div, "id", "details");
    			set_style(div, "top", /*NavbarComponent*/ ctx[1] + "px");
    			set_style(div, "height", document.body.clientHeight - /*NavbarComponent*/ ctx[1] + "px");
    			attr_dev(div, "class", "svelte-17a7r7l");
    			add_location(div, file, 127, 2, 3894);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(router, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*NavbarComponent*/ 2) {
    				set_style(div, "top", /*NavbarComponent*/ ctx[1] + "px");
    			}

    			if (!current || dirty & /*NavbarComponent*/ 2) {
    				set_style(div, "height", document.body.clientHeight - /*NavbarComponent*/ ctx[1] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(router);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(127:2) {#if $ContextVisible}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let navbar;
    	let updating_height;
    	let t0;
    	let div;
    	let current_block_type_index;
    	let if_block0;
    	let t1;
    	let current;

    	function navbar_height_binding(value) {
    		/*navbar_height_binding*/ ctx[5](value);
    	}

    	let navbar_props = {};

    	if (/*NavbarComponent*/ ctx[1] !== void 0) {
    		navbar_props.height = /*NavbarComponent*/ ctx[1];
    	}

    	navbar = new Navbar_1({ props: navbar_props, $$inline: true });
    	binding_callbacks.push(() => bind(navbar, 'height', navbar_height_binding));
    	const if_block_creators = [create_if_block_1, create_if_block_2, create_if_block_3, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$season*/ ctx[3] == "Spring") return 0;
    		if (/*$season*/ ctx[3] == "Summer") return 1;
    		if (/*$season*/ ctx[3] == "Fall") return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let if_block1 = /*$ContextVisible*/ ctx[2] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(navbar.$$.fragment);
    			t0 = space();
    			div = element("div");
    			if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(div, "class", "full-landing-image svelte-17a7r7l");
    			add_location(div, file, 116, 1, 3657);
    			set_style(main, "background", /*background*/ ctx[0][/*$season*/ ctx[3]]);
    			attr_dev(main, "class", "svelte-17a7r7l");
    			add_location(main, file, 114, 0, 3561);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(navbar, main, null);
    			append_dev(main, t0);
    			append_dev(main, div);
    			if_blocks[current_block_type_index].m(div, null);
    			append_dev(div, t1);
    			if (if_block1) if_block1.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const navbar_changes = {};

    			if (!updating_height && dirty & /*NavbarComponent*/ 2) {
    				updating_height = true;
    				navbar_changes.height = /*NavbarComponent*/ ctx[1];
    				add_flush_callback(() => updating_height = false);
    			}

    			navbar.$set(navbar_changes);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block0 = if_blocks[current_block_type_index];

    				if (!if_block0) {
    					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block0.c();
    				}

    				transition_in(if_block0, 1);
    				if_block0.m(div, t1);
    			}

    			if (/*$ContextVisible*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*$ContextVisible*/ 4) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*background, $season*/ 9) {
    				set_style(main, "background", /*background*/ ctx[0][/*$season*/ ctx[3]]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(navbar);
    			if_blocks[current_block_type_index].d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $ContextVisible;
    	let $bench;
    	let $fish_12;
    	let $fish_11;
    	let $fish_10;
    	let $fish_09;
    	let $fish_08;
    	let $fish_07;
    	let $fish_06;
    	let $fish_05;
    	let $fish_04;
    	let $fish_03;
    	let $fish_02;
    	let $fish_01;
    	let $season;
    	validate_store(ContextVisible, 'ContextVisible');
    	component_subscribe($$self, ContextVisible, $$value => $$invalidate(2, $ContextVisible = $$value));
    	validate_store(bench, 'bench');
    	component_subscribe($$self, bench, $$value => $$invalidate(6, $bench = $$value));
    	validate_store(fish_12, 'fish_12');
    	component_subscribe($$self, fish_12, $$value => $$invalidate(7, $fish_12 = $$value));
    	validate_store(fish_11, 'fish_11');
    	component_subscribe($$self, fish_11, $$value => $$invalidate(8, $fish_11 = $$value));
    	validate_store(fish_10, 'fish_10');
    	component_subscribe($$self, fish_10, $$value => $$invalidate(9, $fish_10 = $$value));
    	validate_store(fish_09, 'fish_09');
    	component_subscribe($$self, fish_09, $$value => $$invalidate(10, $fish_09 = $$value));
    	validate_store(fish_08, 'fish_08');
    	component_subscribe($$self, fish_08, $$value => $$invalidate(11, $fish_08 = $$value));
    	validate_store(fish_07, 'fish_07');
    	component_subscribe($$self, fish_07, $$value => $$invalidate(12, $fish_07 = $$value));
    	validate_store(fish_06, 'fish_06');
    	component_subscribe($$self, fish_06, $$value => $$invalidate(13, $fish_06 = $$value));
    	validate_store(fish_05, 'fish_05');
    	component_subscribe($$self, fish_05, $$value => $$invalidate(14, $fish_05 = $$value));
    	validate_store(fish_04, 'fish_04');
    	component_subscribe($$self, fish_04, $$value => $$invalidate(15, $fish_04 = $$value));
    	validate_store(fish_03, 'fish_03');
    	component_subscribe($$self, fish_03, $$value => $$invalidate(16, $fish_03 = $$value));
    	validate_store(fish_02, 'fish_02');
    	component_subscribe($$self, fish_02, $$value => $$invalidate(17, $fish_02 = $$value));
    	validate_store(fish_01, 'fish_01');
    	component_subscribe($$self, fish_01, $$value => $$invalidate(18, $fish_01 = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(3, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	const routes = {
    		'/': Main,
    		'/Profile': Profile,
    		'/2021/Projects': Projects$2,
    		'/2022/Projects': Projects$1,
    		'/2023/Projects': Projects,
    		'/Projects': Projects$3,
    		'/2022/Outsourcing': Outsourcing$1,
    		'/2023/Outsourcing': Outsourcing,
    		'/Outsourcing': Outsourcing$2
    	};

    	let premx = 0;
    	let premy = 0;
    	let background = [];
    	let NavbarComponent = 0;
    	let month = new Date().getMonth() + 1;

    	if (3 <= month && month <= 5) {
    		set_store_value(season, $season = "Spring", $season);
    	} else if (6 <= month && month <= 8) {
    		set_store_value(season, $season = "Summer", $season);
    	} else if (9 <= month && month <= 11) {
    		set_store_value(season, $season = "Fall", $season);
    	} else {
    		set_store_value(season, $season = "Winter", $season);
    	}

    	jquery__default["default"].get('/assets/ascii/fish_1.txt', function (data) {
    		set_store_value(fish_01, $fish_01 = data, $fish_01);
    	});

    	jquery__default["default"].get('/assets/ascii/fish_2.txt', function (data) {
    		set_store_value(fish_02, $fish_02 = data, $fish_02);
    	});

    	jquery__default["default"].get('/assets/ascii/fish_3.txt', function (data) {
    		set_store_value(fish_03, $fish_03 = data, $fish_03);
    	});

    	jquery__default["default"].get('/assets/ascii/fish_4.txt', function (data) {
    		set_store_value(fish_04, $fish_04 = data, $fish_04);
    	});

    	jquery__default["default"].get('/assets/ascii/fish_5.txt', function (data) {
    		set_store_value(fish_05, $fish_05 = data, $fish_05);
    	});

    	jquery__default["default"].get('/assets/ascii/fish_6.txt', function (data) {
    		set_store_value(fish_06, $fish_06 = data, $fish_06);
    	});

    	jquery__default["default"].get('/assets/ascii/fish_7.txt', function (data) {
    		set_store_value(fish_07, $fish_07 = data, $fish_07);
    	});

    	jquery__default["default"].get('/assets/ascii/fish_8.txt', function (data) {
    		set_store_value(fish_08, $fish_08 = data, $fish_08);
    	});

    	jquery__default["default"].get('/assets/ascii/fish_9.txt', function (data) {
    		set_store_value(fish_09, $fish_09 = data, $fish_09);
    	});

    	jquery__default["default"].get('/assets/ascii/fish_10.txt', function (data) {
    		set_store_value(fish_10, $fish_10 = data, $fish_10);
    	});

    	jquery__default["default"].get('/assets/ascii/fish_11.txt', function (data) {
    		set_store_value(fish_11, $fish_11 = data, $fish_11);
    	});

    	jquery__default["default"].get('/assets/ascii/fish_12.txt', function (data) {
    		set_store_value(fish_12, $fish_12 = data, $fish_12);
    	});

    	jquery__default["default"].get('/assets/ascii/bench.txt', function (data) {
    		set_store_value(bench, $bench = data, $bench);
    	});

    	onMount(() => {
    		set_store_value(ContextVisible, $ContextVisible = true, $ContextVisible);
    		$$invalidate(0, background['Spring'] = "linear-gradient(to bottom, #089acf 0%, #a1c4fd 60%,#c2e9fb 90%,#8A3B12 100%)", background);
    		$$invalidate(0, background['Summer'] = "linear-gradient(-45deg, #089acf, #0bcea0)", background);
    		$$invalidate(0, background['Fall'] = "linear-gradient(to bottom, #0051ffb4 0%, #a1c4fd 60%,#c2e9fb 90%,#8A3B12 100%)", background);
    		$$invalidate(0, background['Winter'] = "linear-gradient(to bottom, #071B26 0%,#071B26 30%,#8A3B12 95%, #fff 100%)", background);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function navbar_height_binding(value) {
    		NavbarComponent = value;
    		$$invalidate(1, NavbarComponent);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		ContextVisible,
    		season,
    		bench,
    		fish_01,
    		fish_02,
    		fish_03,
    		fish_04,
    		fish_05,
    		fish_06,
    		fish_07,
    		fish_08,
    		fish_09,
    		fish_10,
    		fish_11,
    		fish_12,
    		Navbar: Navbar_1,
    		Snowflakes,
    		Sakuraflakes: Sakura,
    		Lake,
    		Park,
    		jquery: jquery__default["default"],
    		Router,
    		Main,
    		Profile,
    		Projects: Projects$3,
    		Outsourcing: Outsourcing$2,
    		Projects_2021: Projects$2,
    		Projects_2022: Projects$1,
    		Projects_2023: Projects,
    		Outsourcing_2022: Outsourcing$1,
    		Outsourcing_2023: Outsourcing,
    		routes,
    		premx,
    		premy,
    		background,
    		NavbarComponent,
    		month,
    		$ContextVisible,
    		$bench,
    		$fish_12,
    		$fish_11,
    		$fish_10,
    		$fish_09,
    		$fish_08,
    		$fish_07,
    		$fish_06,
    		$fish_05,
    		$fish_04,
    		$fish_03,
    		$fish_02,
    		$fish_01,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('premx' in $$props) premx = $$props.premx;
    		if ('premy' in $$props) premy = $$props.premy;
    		if ('background' in $$props) $$invalidate(0, background = $$props.background);
    		if ('NavbarComponent' in $$props) $$invalidate(1, NavbarComponent = $$props.NavbarComponent);
    		if ('month' in $$props) month = $$props.month;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		background,
    		NavbarComponent,
    		$ContextVisible,
    		$season,
    		routes,
    		navbar_height_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    	}
    });

    return app;

})(jquery);
//# sourceMappingURL=bundle.js.map
