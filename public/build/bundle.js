
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
    function empty$5() {
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
    const Device = writable({}, () => {
      
        return () => {
        }
    });
    const LastPage = writable({}, () => {
      
        return () => {
        }
    });
    const Color = writable({}, () => {
      
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

    function uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
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
    const file$18 = "node_modules\\sveltestrap\\src\\Collapse.svelte";

    // (61:0) {#if isOpen}
    function create_if_block$k(ctx) {
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
    			add_location(div, file$18, 61, 2, 1551);
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
    		id: create_if_block$k.name,
    		type: "if",
    		source: "(61:0) {#if isOpen}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1h(ctx) {
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[21]);
    	let if_block = /*isOpen*/ ctx[0] && create_if_block$k(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$5();
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
    					if_block = create_if_block$k(ctx);
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
    		id: create_fragment$1h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1h($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$1h, create_fragment$1h, safe_not_equal, {
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
    			id: create_fragment$1h.name
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

    function blur(node, { delay = 0, duration = 400, easing = cubicInOut, amount = 5, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const f = style.filter === 'none' ? '' : style.filter;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (_t, u) => `opacity: ${target_opacity - (od * u)}; filter: ${f} blur(${u * amount}px);`
        };
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

    /* node_modules\sveltestrap\src\Button.svelte generated by Svelte v3.55.1 */
    const file$17 = "node_modules\\sveltestrap\\src\\Button.svelte";

    // (54:0) {:else}
    function create_else_block_1(ctx) {
    	let button;
    	let button_aria_label_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);
    	const default_slot_or_fallback = default_slot || fallback_block$2(ctx);

    	let button_levels = [
    		/*$$restProps*/ ctx[9],
    		{ class: /*classes*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[2] },
    		{ value: /*value*/ ctx[5] },
    		{
    			"aria-label": button_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6]
    		},
    		{ style: /*style*/ ctx[4] }
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
    			add_location(button, file$17, 54, 2, 1124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(button, null);
    			}

    			if (button.autofocus) button.focus();
    			/*button_binding*/ ctx[23](button);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler_1*/ ctx[21], false, false, false);
    				mounted = true;
    			}
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
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*children, $$scope*/ 262146)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				(!current || dirty & /*classes*/ 128) && { class: /*classes*/ ctx[7] },
    				(!current || dirty & /*disabled*/ 4) && { disabled: /*disabled*/ ctx[2] },
    				(!current || dirty & /*value*/ 32) && { value: /*value*/ ctx[5] },
    				(!current || dirty & /*ariaLabel, defaultAriaLabel*/ 320 && button_aria_label_value !== (button_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6])) && { "aria-label": button_aria_label_value },
    				(!current || dirty & /*style*/ 16) && { style: /*style*/ ctx[4] }
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
    			/*button_binding*/ ctx[23](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(54:0) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (37:0) {#if href}
    function create_if_block$j(ctx) {
    	let a;
    	let current_block_type_index;
    	let if_block;
    	let a_aria_label_value;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_1$9, create_else_block$b];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*children*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	let a_levels = [
    		/*$$restProps*/ ctx[9],
    		{ class: /*classes*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[2] },
    		{ href: /*href*/ ctx[3] },
    		{
    			"aria-label": a_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6]
    		},
    		{ style: /*style*/ ctx[4] }
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			a = element("a");
    			if_block.c();
    			set_attributes(a, a_data);
    			add_location(a, file$17, 37, 2, 866);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			if_blocks[current_block_type_index].m(a, null);
    			/*a_binding*/ ctx[22](a);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*click_handler*/ ctx[20], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

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
    				if_block.m(a, null);
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				(!current || dirty & /*classes*/ 128) && { class: /*classes*/ ctx[7] },
    				(!current || dirty & /*disabled*/ 4) && { disabled: /*disabled*/ ctx[2] },
    				(!current || dirty & /*href*/ 8) && { href: /*href*/ ctx[3] },
    				(!current || dirty & /*ariaLabel, defaultAriaLabel*/ 320 && a_aria_label_value !== (a_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6])) && { "aria-label": a_aria_label_value },
    				(!current || dirty & /*style*/ 16) && { style: /*style*/ ctx[4] }
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
    			if (detaching) detach_dev(a);
    			if_blocks[current_block_type_index].d();
    			/*a_binding*/ ctx[22](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block$j.name,
    		type: "if",
    		source: "(37:0) {#if href}",
    		ctx
    	});

    	return block_1;
    }

    // (68:6) {:else}
    function create_else_block_2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

    	const block_1 = {
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
    		block: block_1,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(68:6) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (66:6) {#if children}
    function create_if_block_2$5(ctx) {
    	let t;

    	const block_1 = {
    		c: function create() {
    			t = text(/*children*/ ctx[1]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 2) set_data_dev(t, /*children*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_2$5.name,
    		type: "if",
    		source: "(66:6) {#if children}",
    		ctx
    	});

    	return block_1;
    }

    // (65:10)        
    function fallback_block$2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2$5, create_else_block_2];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*children*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_2(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block_1 = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$5();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx);

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
    		id: fallback_block$2.name,
    		type: "fallback",
    		source: "(65:10)        ",
    		ctx
    	});

    	return block_1;
    }

    // (50:4) {:else}
    function create_else_block$b(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

    	const block_1 = {
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
    		block: block_1,
    		id: create_else_block$b.name,
    		type: "else",
    		source: "(50:4) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (48:4) {#if children}
    function create_if_block_1$9(ctx) {
    	let t;

    	const block_1 = {
    		c: function create() {
    			t = text(/*children*/ ctx[1]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 2) set_data_dev(t, /*children*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_1$9.name,
    		type: "if",
    		source: "(48:4) {#if children}",
    		ctx
    	});

    	return block_1;
    }

    function create_fragment$1g(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$j, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*href*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block_1 = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$5();
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
    		id: create_fragment$1g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block_1;
    }

    function instance$1g($$self, $$props, $$invalidate) {
    	let ariaLabel;
    	let classes;
    	let defaultAriaLabel;

    	const omit_props_names = [
    		"class","active","block","children","close","color","disabled","href","inner","outline","size","style","value","white"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { active = false } = $$props;
    	let { block = false } = $$props;
    	let { children = undefined } = $$props;
    	let { close = false } = $$props;
    	let { color = 'secondary' } = $$props;
    	let { disabled = false } = $$props;
    	let { href = '' } = $$props;
    	let { inner = undefined } = $$props;
    	let { outline = false } = $$props;
    	let { size = null } = $$props;
    	let { style = '' } = $$props;
    	let { value = '' } = $$props;
    	let { white = false } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function a_binding($$value) {
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
    		$$invalidate(24, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(10, className = $$new_props.class);
    		if ('active' in $$new_props) $$invalidate(11, active = $$new_props.active);
    		if ('block' in $$new_props) $$invalidate(12, block = $$new_props.block);
    		if ('children' in $$new_props) $$invalidate(1, children = $$new_props.children);
    		if ('close' in $$new_props) $$invalidate(13, close = $$new_props.close);
    		if ('color' in $$new_props) $$invalidate(14, color = $$new_props.color);
    		if ('disabled' in $$new_props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ('href' in $$new_props) $$invalidate(3, href = $$new_props.href);
    		if ('inner' in $$new_props) $$invalidate(0, inner = $$new_props.inner);
    		if ('outline' in $$new_props) $$invalidate(15, outline = $$new_props.outline);
    		if ('size' in $$new_props) $$invalidate(16, size = $$new_props.size);
    		if ('style' in $$new_props) $$invalidate(4, style = $$new_props.style);
    		if ('value' in $$new_props) $$invalidate(5, value = $$new_props.value);
    		if ('white' in $$new_props) $$invalidate(17, white = $$new_props.white);
    		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		active,
    		block,
    		children,
    		close,
    		color,
    		disabled,
    		href,
    		inner,
    		outline,
    		size,
    		style,
    		value,
    		white,
    		defaultAriaLabel,
    		classes,
    		ariaLabel
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(24, $$props = assign(assign({}, $$props), $$new_props));
    		if ('className' in $$props) $$invalidate(10, className = $$new_props.className);
    		if ('active' in $$props) $$invalidate(11, active = $$new_props.active);
    		if ('block' in $$props) $$invalidate(12, block = $$new_props.block);
    		if ('children' in $$props) $$invalidate(1, children = $$new_props.children);
    		if ('close' in $$props) $$invalidate(13, close = $$new_props.close);
    		if ('color' in $$props) $$invalidate(14, color = $$new_props.color);
    		if ('disabled' in $$props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ('href' in $$props) $$invalidate(3, href = $$new_props.href);
    		if ('inner' in $$props) $$invalidate(0, inner = $$new_props.inner);
    		if ('outline' in $$props) $$invalidate(15, outline = $$new_props.outline);
    		if ('size' in $$props) $$invalidate(16, size = $$new_props.size);
    		if ('style' in $$props) $$invalidate(4, style = $$new_props.style);
    		if ('value' in $$props) $$invalidate(5, value = $$new_props.value);
    		if ('white' in $$props) $$invalidate(17, white = $$new_props.white);
    		if ('defaultAriaLabel' in $$props) $$invalidate(6, defaultAriaLabel = $$new_props.defaultAriaLabel);
    		if ('classes' in $$props) $$invalidate(7, classes = $$new_props.classes);
    		if ('ariaLabel' in $$props) $$invalidate(8, ariaLabel = $$new_props.ariaLabel);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(8, ariaLabel = $$props['aria-label']);

    		if ($$self.$$.dirty & /*className, close, outline, color, size, block, active, white*/ 261120) {
    			$$invalidate(7, classes = classnames(className, close ? 'btn-close' : 'btn', close || `btn${outline ? '-outline' : ''}-${color}`, size ? `btn-${size}` : false, block ? 'd-block w-100' : false, {
    				active,
    				'btn-close-white': close && white
    			}));
    		}

    		if ($$self.$$.dirty & /*close*/ 8192) {
    			$$invalidate(6, defaultAriaLabel = close ? 'Close' : null);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		inner,
    		children,
    		disabled,
    		href,
    		style,
    		value,
    		defaultAriaLabel,
    		classes,
    		ariaLabel,
    		$$restProps,
    		className,
    		active,
    		block,
    		close,
    		color,
    		outline,
    		size,
    		white,
    		$$scope,
    		slots,
    		click_handler,
    		click_handler_1,
    		a_binding,
    		button_binding
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1g, create_fragment$1g, safe_not_equal, {
    			class: 10,
    			active: 11,
    			block: 12,
    			children: 1,
    			close: 13,
    			color: 14,
    			disabled: 2,
    			href: 3,
    			inner: 0,
    			outline: 15,
    			size: 16,
    			style: 4,
    			value: 5,
    			white: 17
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$1g.name
    		});
    	}

    	get class() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get block() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set block(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get children() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set children(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inner() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inner(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outline() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outline(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get white() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set white(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
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
    const file$16 = "node_modules\\sveltestrap\\src\\Dropdown.svelte";

    // (127:0) {:else}
    function create_else_block$a(ctx) {
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
    			add_location(div, file$16, 127, 2, 3323);
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
    		id: create_else_block$a.name,
    		type: "else",
    		source: "(127:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (123:0) {#if nav}
    function create_if_block$i(ctx) {
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
    			add_location(li, file$16, 123, 2, 3232);
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
    		id: create_if_block$i.name,
    		type: "if",
    		source: "(123:0) {#if nav}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1f(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$i, create_else_block$a];
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
    			if_block_anchor = empty$5();
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
    		id: create_fragment$1f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1f($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$1f, create_fragment$1f, safe_not_equal, {
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
    			id: create_fragment$1f.name
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
    const file$15 = "node_modules\\sveltestrap\\src\\Container.svelte";

    function create_fragment$1e(ctx) {
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
    			add_location(div, file$15, 23, 0, 542);
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
    		id: create_fragment$1e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1e($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$1e, create_fragment$1e, safe_not_equal, {
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
    			id: create_fragment$1e.name
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
    const file$14 = "node_modules\\sveltestrap\\src\\DropdownItem.svelte";

    // (49:0) {:else}
    function create_else_block$9(ctx) {
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
    			add_location(button, file$14, 49, 2, 1155);
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
    		id: create_else_block$9.name,
    		type: "else",
    		source: "(49:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (45:15) 
    function create_if_block_2$4(ctx) {
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
    			add_location(a, file$14, 45, 2, 1048);
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
    		id: create_if_block_2$4.name,
    		type: "if",
    		source: "(45:15) ",
    		ctx
    	});

    	return block;
    }

    // (41:18) 
    function create_if_block_1$8(ctx) {
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
    			add_location(div, file$14, 41, 2, 933);
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
    		id: create_if_block_1$8.name,
    		type: "if",
    		source: "(41:18) ",
    		ctx
    	});

    	return block;
    }

    // (37:0) {#if header}
    function create_if_block$h(ctx) {
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
    			add_location(h6, file$14, 37, 2, 817);
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
    		id: create_if_block$h.name,
    		type: "if",
    		source: "(37:0) {#if header}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1d(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$h, create_if_block_1$8, create_if_block_2$4, create_else_block$9];
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
    			if_block_anchor = empty$5();
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
    		id: create_fragment$1d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1d($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$1d, create_fragment$1d, safe_not_equal, {
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
    			id: create_fragment$1d.name
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
    const file$13 = "node_modules\\sveltestrap\\src\\DropdownMenu.svelte";

    function create_fragment$1c(ctx) {
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
    			add_location(div, file$13, 41, 0, 933);
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
    		id: create_fragment$1c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1c($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$1c, create_fragment$1c, safe_not_equal, { class: 5, dark: 6, end: 7, right: 8 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DropdownMenu",
    			options,
    			id: create_fragment$1c.name
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
    const file$12 = "node_modules\\sveltestrap\\src\\DropdownToggle.svelte";

    // (94:0) {:else}
    function create_else_block$8(ctx) {
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
    			add_location(button, file$12, 94, 2, 1948);
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
    		id: create_else_block$8.name,
    		type: "else",
    		source: "(94:0) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (80:25) 
    function create_if_block_2$3(ctx) {
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
    			add_location(span, file$12, 80, 2, 1673);
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
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(80:25) ",
    		ctx
    	});

    	return block_1;
    }

    // (66:24) 
    function create_if_block_1$7(ctx) {
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
    			add_location(div, file$12, 66, 2, 1382);
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
    		id: create_if_block_1$7.name,
    		type: "if",
    		source: "(66:24) ",
    		ctx
    	});

    	return block_1;
    }

    // (51:0) {#if nav}
    function create_if_block$g(ctx) {
    	let a;
    	let a_aria_expanded_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], null);
    	const default_slot_or_fallback = default_slot || fallback_block$1(ctx);

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
    			add_location(a, file$12, 51, 2, 1080);
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
    		id: create_if_block$g.name,
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
    			add_location(span, file$12, 105, 6, 2165);
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
    			add_location(span, file$12, 90, 6, 1867);
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
    			add_location(span, file$12, 76, 6, 1575);
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
    function fallback_block$1(ctx) {
    	let span;
    	let t;

    	const block_1 = {
    		c: function create() {
    			span = element("span");
    			t = text(/*ariaLabel*/ ctx[1]);
    			attr_dev(span, "class", "visually-hidden");
    			add_location(span, file$12, 62, 6, 1287);
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
    		id: fallback_block$1.name,
    		type: "fallback",
    		source: "(62:10)        ",
    		ctx
    	});

    	return block_1;
    }

    function create_fragment$1b(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$g, create_if_block_1$7, create_if_block_2$3, create_else_block$8];
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
    			if_block_anchor = empty$5();
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
    		id: create_fragment$1b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block_1;
    }

    function instance$1b($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$1b, create_fragment$1b, safe_not_equal, {
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
    			id: create_fragment$1b.name
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

    /* node_modules\sveltestrap\src\InlineContainer.svelte generated by Svelte v3.55.1 */

    const file$11 = "node_modules\\sveltestrap\\src\\InlineContainer.svelte";

    function create_fragment$1a(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			add_location(div, file$11, 3, 0, 67);
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
    		id: create_fragment$1a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('InlineContainer', slots, ['default']);
    	let x = 'wtf svelte?'; // eslint-disable-line
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<InlineContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ x });

    	$$self.$inject_state = $$props => {
    		if ('x' in $$props) x = $$props.x;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$$scope, slots];
    }

    class InlineContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1a, create_fragment$1a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "InlineContainer",
    			options,
    			id: create_fragment$1a.name
    		});
    	}
    }

    /* node_modules\sveltestrap\src\Portal.svelte generated by Svelte v3.55.1 */
    const file$10 = "node_modules\\sveltestrap\\src\\Portal.svelte";

    function create_fragment$19(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);
    	let div_levels = [/*$$restProps*/ ctx[1]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$10, 18, 0, 346);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[4](div);
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

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]]));
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
    			/*div_binding*/ ctx[4](null);
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
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Portal', slots, ['default']);
    	let ref;
    	let portal;

    	onMount(() => {
    		portal = document.createElement('div');
    		document.body.appendChild(portal);
    		portal.appendChild(ref);
    	});

    	onDestroy(() => {
    		if (typeof document !== 'undefined') {
    			document.body.removeChild(portal);
    		}
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ onMount, onDestroy, ref, portal });

    	$$self.$inject_state = $$new_props => {
    		if ('ref' in $$props) $$invalidate(0, ref = $$new_props.ref);
    		if ('portal' in $$props) portal = $$new_props.portal;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ref, $$restProps, $$scope, slots, div_binding];
    }

    class Portal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$19, create_fragment$19, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Portal",
    			options,
    			id: create_fragment$19.name
    		});
    	}
    }

    /* node_modules\sveltestrap\src\Nav.svelte generated by Svelte v3.55.1 */
    const file$$ = "node_modules\\sveltestrap\\src\\Nav.svelte";

    function create_fragment$18(ctx) {
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
    			add_location(ul, file$$, 39, 0, 941);
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
    		id: create_fragment$18.name,
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

    function instance$18($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$18, create_fragment$18, safe_not_equal, {
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
    			id: create_fragment$18.name
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
    const file$_ = "node_modules\\sveltestrap\\src\\Navbar.svelte";

    // (44:2) {:else}
    function create_else_block$7(ctx) {
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
    		id: create_else_block$7.name,
    		type: "else",
    		source: "(44:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (40:2) {#if container}
    function create_if_block$f(ctx) {
    	let container_1;
    	let current;

    	container_1 = new Container({
    			props: {
    				fluid: /*container*/ ctx[0] === 'fluid',
    				$$slots: { default: [create_default_slot$B] },
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
    		id: create_if_block$f.name,
    		type: "if",
    		source: "(40:2) {#if container}",
    		ctx
    	});

    	return block;
    }

    // (41:4) <Container fluid={container === 'fluid'}>
    function create_default_slot$B(ctx) {
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
    		id: create_default_slot$B.name,
    		type: "slot",
    		source: "(41:4) <Container fluid={container === 'fluid'}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$17(ctx) {
    	let nav;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$f, create_else_block$7];
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
    			add_location(nav, file$_, 38, 0, 889);
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
    		id: create_fragment$17.name,
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

    function instance$17($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$17, create_fragment$17, safe_not_equal, {
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
    			id: create_fragment$17.name
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
    const file$Z = "node_modules\\sveltestrap\\src\\NavItem.svelte";

    function create_fragment$16(ctx) {
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
    			add_location(li, file$Z, 10, 0, 219);
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
    		id: create_fragment$16.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$16($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$16, create_fragment$16, safe_not_equal, { class: 2, active: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavItem",
    			options,
    			id: create_fragment$16.name
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
    const file$Y = "node_modules\\sveltestrap\\src\\NavLink.svelte";

    function create_fragment$15(ctx) {
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
    			add_location(a, file$Y, 27, 0, 472);
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
    		id: create_fragment$15.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$15($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$15, create_fragment$15, safe_not_equal, {
    			class: 4,
    			disabled: 5,
    			active: 6,
    			href: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavLink",
    			options,
    			id: create_fragment$15.name
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

    /* node_modules\sveltestrap\src\NavbarToggler.svelte generated by Svelte v3.55.1 */
    const file$X = "node_modules\\sveltestrap\\src\\NavbarToggler.svelte";

    // (13:8)      
    function fallback_block(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "navbar-toggler-icon");
    			add_location(span, file$X, 13, 4, 274);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(13:8)      ",
    		ctx
    	});

    	return block;
    }

    // (12:0) <Button {...$$restProps} on:click class={classes}>
    function create_default_slot$A(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}
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
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$A.name,
    		type: "slot",
    		source: "(12:0) <Button {...$$restProps} on:click class={classes}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$14(ctx) {
    	let button;
    	let current;
    	const button_spread_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];

    	let button_props = {
    		$$slots: { default: [create_default_slot$A] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < button_spread_levels.length; i += 1) {
    		button_props = assign(button_props, button_spread_levels[i]);
    	}

    	button = new Button({ props: button_props, $$inline: true });
    	button.$on("click", /*click_handler*/ ctx[4]);

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button_changes = (dirty & /*$$restProps, classes*/ 3)
    			? get_spread_update(button_spread_levels, [
    					dirty & /*$$restProps*/ 2 && get_spread_object(/*$$restProps*/ ctx[1]),
    					dirty & /*classes*/ 1 && { class: /*classes*/ ctx[0] }
    				])
    			: {};

    			if (dirty & /*$$scope*/ 32) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
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

    function instance$14($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavbarToggler', slots, ['default']);
    	let { class: className = '' } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ classnames, Button, className, classes });

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('classes' in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className*/ 4) {
    			$$invalidate(0, classes = classnames(className, 'navbar-toggler'));
    		}
    	};

    	return [classes, $$restProps, className, slots, click_handler, $$scope];
    }

    class NavbarToggler extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$14, create_fragment$14, safe_not_equal, { class: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavbarToggler",
    			options,
    			id: create_fragment$14.name
    		});
    	}

    	get class() {
    		throw new Error("<NavbarToggler>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<NavbarToggler>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Tooltip.svelte generated by Svelte v3.55.1 */
    const file$W = "node_modules\\sveltestrap\\src\\Tooltip.svelte";

    // (123:0) {#if isOpen}
    function create_if_block$e(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*outer*/ ctx[5];

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot$z] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty$5();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (dirty & /*$$scope, $$restProps, classes, id, popperPlacement, tooltipEl, children*/ 262366) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*outer*/ ctx[5])) {
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
    		id: create_if_block$e.name,
    		type: "if",
    		source: "(123:0) {#if isOpen}",
    		ctx
    	});

    	return block;
    }

    // (137:8) {:else}
    function create_else_block$6(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

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
    		id: create_else_block$6.name,
    		type: "else",
    		source: "(137:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (135:8) {#if children}
    function create_if_block_1$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*children*/ ctx[1]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 2) set_data_dev(t, /*children*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$6.name,
    		type: "if",
    		source: "(135:8) {#if children}",
    		ctx
    	});

    	return block;
    }

    // (124:2) <svelte:component this={outer}>
    function create_default_slot$z(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block_1$6, create_else_block$6];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*children*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	let div2_levels = [
    		/*$$restProps*/ ctx[7],
    		{ class: /*classes*/ ctx[6] },
    		{ id: /*id*/ ctx[2] },
    		{ role: "tooltip" },
    		{
    			"x-placement": /*popperPlacement*/ ctx[3]
    		}
    	];

    	let div2_data = {};

    	for (let i = 0; i < div2_levels.length; i += 1) {
    		div2_data = assign(div2_data, div2_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			if_block.c();
    			attr_dev(div0, "class", "tooltip-arrow");
    			attr_dev(div0, "data-popper-arrow", "");
    			add_location(div0, file$W, 132, 6, 3319);
    			attr_dev(div1, "class", "tooltip-inner");
    			add_location(div1, file$W, 133, 6, 3373);
    			set_attributes(div2, div2_data);
    			add_location(div2, file$W, 124, 4, 3161);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t);
    			append_dev(div2, div1);
    			if_blocks[current_block_type_index].m(div1, null);
    			/*div2_binding*/ ctx[17](div2);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
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
    				if_block.m(div1, null);
    			}

    			set_attributes(div2, div2_data = get_spread_update(div2_levels, [
    				dirty & /*$$restProps*/ 128 && /*$$restProps*/ ctx[7],
    				(!current || dirty & /*classes*/ 64) && { class: /*classes*/ ctx[6] },
    				(!current || dirty & /*id*/ 4) && { id: /*id*/ ctx[2] },
    				{ role: "tooltip" },
    				(!current || dirty & /*popperPlacement*/ 8) && {
    					"x-placement": /*popperPlacement*/ ctx[3]
    				}
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
    			if (detaching) detach_dev(div2);
    			if_blocks[current_block_type_index].d();
    			/*div2_binding*/ ctx[17](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$z.name,
    		type: "slot",
    		source: "(124:2) <svelte:component this={outer}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$13(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*isOpen*/ ctx[0] && create_if_block$e(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$5();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*isOpen*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*isOpen*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$e(ctx);
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
    		id: create_fragment$13.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$13($$self, $$props, $$invalidate) {
    	let classes;
    	let outer;
    	const omit_props_names = ["class","animation","children","container","id","isOpen","placement","target"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tooltip', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { animation = true } = $$props;
    	let { children = undefined } = $$props;
    	let { container = undefined } = $$props;
    	let { id = `tooltip_${uuid()}` } = $$props;
    	let { isOpen = false } = $$props;
    	let { placement = 'top' } = $$props;
    	let { target = '' } = $$props;
    	let bsPlacement;
    	let popperInstance;
    	let popperPlacement = placement;
    	let targetEl;
    	let tooltipEl;

    	const checkPopperPlacement = {
    		name: 'checkPopperPlacement',
    		enabled: true,
    		phase: 'main',
    		fn({ state }) {
    			$$invalidate(3, popperPlacement = state.placement);
    		}
    	};

    	const open = () => $$invalidate(0, isOpen = true);
    	const close = () => $$invalidate(0, isOpen = false);
    	onMount(registerEventListeners);
    	onDestroy(unregisterEventListeners);

    	function registerEventListeners() {
    		if (target == null || target.length == 0) {
    			$$invalidate(15, targetEl = null);
    			return;
    		}

    		// Check if target is HTMLElement 
    		try {
    			if (target instanceof HTMLElement) {
    				$$invalidate(15, targetEl = target);
    			}
    		} catch(e) {
    			
    		} // fails on SSR

    		// If targetEl has not been found yet 
    		if (targetEl == null) {
    			// Check if target can be found via querySelector
    			try {
    				$$invalidate(15, targetEl = document.querySelector(`#${target}`));
    			} catch(e) {
    				
    			} // fails on SSR
    		}

    		// If we've found targetEl
    		if (targetEl) {
    			targetEl.addEventListener('mouseover', open);
    			targetEl.addEventListener('mouseleave', close);
    			targetEl.addEventListener('focus', open);
    			targetEl.addEventListener('blur', close);
    		}
    	}

    	function unregisterEventListeners() {
    		if (targetEl) {
    			targetEl.removeEventListener('mouseover', open);
    			targetEl.removeEventListener('mouseleave', close);
    			targetEl.removeEventListener('focus', open);
    			targetEl.removeEventListener('blur', close);
    			targetEl.removeAttribute('aria-describedby');
    		}
    	}

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			tooltipEl = $$value;
    			$$invalidate(4, tooltipEl);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(8, className = $$new_props.class);
    		if ('animation' in $$new_props) $$invalidate(9, animation = $$new_props.animation);
    		if ('children' in $$new_props) $$invalidate(1, children = $$new_props.children);
    		if ('container' in $$new_props) $$invalidate(10, container = $$new_props.container);
    		if ('id' in $$new_props) $$invalidate(2, id = $$new_props.id);
    		if ('isOpen' in $$new_props) $$invalidate(0, isOpen = $$new_props.isOpen);
    		if ('placement' in $$new_props) $$invalidate(11, placement = $$new_props.placement);
    		if ('target' in $$new_props) $$invalidate(12, target = $$new_props.target);
    		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		onMount,
    		createPopper,
    		classnames,
    		uuid,
    		InlineContainer,
    		Portal,
    		className,
    		animation,
    		children,
    		container,
    		id,
    		isOpen,
    		placement,
    		target,
    		bsPlacement,
    		popperInstance,
    		popperPlacement,
    		targetEl,
    		tooltipEl,
    		checkPopperPlacement,
    		open,
    		close,
    		registerEventListeners,
    		unregisterEventListeners,
    		outer,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(8, className = $$new_props.className);
    		if ('animation' in $$props) $$invalidate(9, animation = $$new_props.animation);
    		if ('children' in $$props) $$invalidate(1, children = $$new_props.children);
    		if ('container' in $$props) $$invalidate(10, container = $$new_props.container);
    		if ('id' in $$props) $$invalidate(2, id = $$new_props.id);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$new_props.isOpen);
    		if ('placement' in $$props) $$invalidate(11, placement = $$new_props.placement);
    		if ('target' in $$props) $$invalidate(12, target = $$new_props.target);
    		if ('bsPlacement' in $$props) $$invalidate(13, bsPlacement = $$new_props.bsPlacement);
    		if ('popperInstance' in $$props) $$invalidate(14, popperInstance = $$new_props.popperInstance);
    		if ('popperPlacement' in $$props) $$invalidate(3, popperPlacement = $$new_props.popperPlacement);
    		if ('targetEl' in $$props) $$invalidate(15, targetEl = $$new_props.targetEl);
    		if ('tooltipEl' in $$props) $$invalidate(4, tooltipEl = $$new_props.tooltipEl);
    		if ('outer' in $$props) $$invalidate(5, outer = $$new_props.outer);
    		if ('classes' in $$props) $$invalidate(6, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*isOpen, tooltipEl, targetEl, placement, popperInstance*/ 51217) {
    			{
    				if (isOpen && tooltipEl) {
    					$$invalidate(14, popperInstance = createPopper(targetEl, tooltipEl, {
    						placement,
    						modifiers: [checkPopperPlacement]
    					}));
    				} else if (popperInstance) {
    					popperInstance.destroy();
    					$$invalidate(14, popperInstance = undefined);
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*target*/ 4096) {
    			if (target) {
    				unregisterEventListeners();
    				registerEventListeners();
    			}
    		}

    		if ($$self.$$.dirty & /*targetEl, isOpen, id*/ 32773) {
    			if (targetEl) {
    				if (isOpen) targetEl.setAttribute('aria-describedby', id); else targetEl.removeAttribute('aria-describedby');
    			}
    		}

    		if ($$self.$$.dirty & /*popperPlacement*/ 8) {
    			{
    				if (popperPlacement === 'left') $$invalidate(13, bsPlacement = 'start'); else if (popperPlacement === 'right') $$invalidate(13, bsPlacement = 'end'); else $$invalidate(13, bsPlacement = popperPlacement);
    			}
    		}

    		if ($$self.$$.dirty & /*className, animation, bsPlacement, isOpen*/ 8961) {
    			$$invalidate(6, classes = classnames(className, 'tooltip', animation ? 'fade' : false, `bs-tooltip-${bsPlacement}`, isOpen ? 'show' : false));
    		}

    		if ($$self.$$.dirty & /*container*/ 1024) {
    			$$invalidate(5, outer = container === 'inline' ? InlineContainer : Portal);
    		}
    	};

    	return [
    		isOpen,
    		children,
    		id,
    		popperPlacement,
    		tooltipEl,
    		outer,
    		classes,
    		$$restProps,
    		className,
    		animation,
    		container,
    		placement,
    		target,
    		bsPlacement,
    		popperInstance,
    		targetEl,
    		slots,
    		div2_binding,
    		$$scope
    	];
    }

    class Tooltip extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$13, create_fragment$13, safe_not_equal, {
    			class: 8,
    			animation: 9,
    			children: 1,
    			container: 10,
    			id: 2,
    			isOpen: 0,
    			placement: 11,
    			target: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tooltip",
    			options,
    			id: create_fragment$13.name
    		});
    	}

    	get class() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get animation() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set animation(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get children() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set children(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get container() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set container(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placement() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placement(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get target() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set target(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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
    const file$V = "src\\component\\Navlogo.svelte";

    function create_fragment$12(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let span;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			span = element("span");
    			span.textContent = "abcBank";
    			attr_dev(img, "class", "logo svelte-1wm9f4z");
    			attr_dev(img, "alt", "logo");
    			if (!src_url_equal(img.src, img_src_value = "assets/image/icon.png")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$V, 30, 2, 728);
    			attr_dev(span, "class", "logo-text svelte-1wm9f4z");
    			add_location(span, file$V, 31, 2, 791);
    			attr_dev(div, "class", "NavLogo svelte-1wm9f4z");
    			attr_dev(div, "style", /*LogoStyle*/ ctx[0]);
    			add_location(div, file$V, 29, 0, 657);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, span);

    			if (!mounted) {
    				dispose = listen_dev(div, "mouseenter", /*LogoHovered*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*LogoStyle*/ 1) {
    				attr_dev(div, "style", /*LogoStyle*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
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
    	let LogoStyle;
    	let $springyRotation;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navlogo', slots, []);
    	let { pushFunc } = $$props;
    	let LogoHover = false;
    	let LogoRotation = 10;
    	let LogoRotateTiming = 150;
    	let springyRotation = spring(0, { stiffness: 0.1, damping: 0.15 });
    	validate_store(springyRotation, 'springyRotation');
    	component_subscribe($$self, springyRotation, value => $$invalidate(5, $springyRotation = value));

    	function LogoHovered() {
    		$$invalidate(4, LogoHover = true);
    	}

    	$$self.$$.on_mount.push(function () {
    		if (pushFunc === undefined && !('pushFunc' in $$props || $$self.$$.bound[$$self.$$.props['pushFunc']])) {
    			console.warn("<Navlogo> was created without expected prop 'pushFunc'");
    		}
    	});

    	const writable_props = ['pushFunc'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navlogo> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('pushFunc' in $$props) $$invalidate(3, pushFunc = $$props.pushFunc);
    	};

    	$$self.$capture_state = () => ({
    		spring,
    		pushFunc,
    		LogoHover,
    		LogoRotation,
    		LogoRotateTiming,
    		springyRotation,
    		LogoHovered,
    		LogoStyle,
    		$springyRotation
    	});

    	$$self.$inject_state = $$props => {
    		if ('pushFunc' in $$props) $$invalidate(3, pushFunc = $$props.pushFunc);
    		if ('LogoHover' in $$props) $$invalidate(4, LogoHover = $$props.LogoHover);
    		if ('LogoRotation' in $$props) $$invalidate(6, LogoRotation = $$props.LogoRotation);
    		if ('LogoRotateTiming' in $$props) $$invalidate(7, LogoRotateTiming = $$props.LogoRotateTiming);
    		if ('springyRotation' in $$props) $$invalidate(1, springyRotation = $$props.springyRotation);
    		if ('LogoStyle' in $$props) $$invalidate(0, LogoStyle = $$props.LogoStyle);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*LogoHover*/ 16) {
    			if (LogoHover) {
    				window.setTimeout(
    					() => {
    						$$invalidate(4, LogoHover = false);
    					},
    					LogoRotateTiming
    				);
    			}
    		}

    		if ($$self.$$.dirty & /*LogoHover*/ 16) {
    			springyRotation.set(LogoHover ? LogoRotation : 0);
    		}

    		if ($$self.$$.dirty & /*$springyRotation*/ 32) {
    			$$invalidate(0, LogoStyle = `
          transform: rotate(${$springyRotation}deg)
      `);
    		}
    	};

    	return [LogoStyle, springyRotation, LogoHovered, pushFunc, LogoHover, $springyRotation];
    }

    class Navlogo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$12, create_fragment$12, safe_not_equal, { pushFunc: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navlogo",
    			options,
    			id: create_fragment$12.name
    		});
    	}

    	get pushFunc() {
    		throw new Error("<Navlogo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pushFunc(value) {
    		throw new Error("<Navlogo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    // Material Design Icons v7.1.96
    var mdiAccountBox = "M6,17C6,15 10,13.9 12,13.9C14,13.9 18,15 18,17V18H6M15,9A3,3 0 0,1 12,12A3,3 0 0,1 9,9A3,3 0 0,1 12,6A3,3 0 0,1 15,9M3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5C3.89,3 3,3.9 3,5Z";
    var mdiArrowDownBoldOutline = "M22,11L12,21L2,11H8V3H16V11H22M12,18L17,13H14V5H10V13H7L12,18Z";
    var mdiArrowLeft = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z";
    var mdiCalendarMonthOutline = "M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";
    var mdiCheckBold$1 = "M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z";
    var mdiChevronRight = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
    var mdiCodeBrackets = "M15,4V6H18V18H15V20H20V4M4,4V20H9V18H6V6H9V4H4Z";
    var mdiCodeGreaterThanOrEqual = "M13,13H18V15H13M13,9H18V11H13M6.91,7.41L11.5,12L6.91,16.6L5.5,15.18L8.68,12L5.5,8.82M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5Z";
    var mdiConsoleNetwork = "M17,3A2,2 0 0,1 19,5V15A2,2 0 0,1 17,17H13V19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H7A2,2 0 0,1 5,15V5A2,2 0 0,1 7,3H17M7,7L11,11L7,15H9.85L13.13,11.72C13.5,11.33 13.5,10.7 13.13,10.3L9.83,7H7M17,13H14V15H17V13Z";
    var mdiCurrencyKrw = "M2,3H4L5.33,9H9.33L10.67,3H13.33L14.67,9H18.67L20,3H22L20.67,9H22V11H20.22L19.78,13H22V15H19.33L18,21H15.33L14,15H10L8.67,21H6L4.67,15H2V13H4.22L3.78,11H2V9H3.33L2,3M13.11,11H10.89L10.44,13H13.56L13.11,11M7.33,18L8,15H6.67L7.33,18M8.89,11H5.78L6.22,13H8.44L8.89,11M16.67,18L17.33,15H16L16.67,18M18.22,11H15.11L15.56,13H17.78L18.22,11M12,6L11.33,9H12.67L12,6Z";
    var mdiCursorDefaultClick = "M10.76,8.69A0.76,0.76 0 0,0 10,9.45V20.9C10,21.32 10.34,21.66 10.76,21.66C10.95,21.66 11.11,21.6 11.24,21.5L13.15,19.95L14.81,23.57C14.94,23.84 15.21,24 15.5,24C15.61,24 15.72,24 15.83,23.92L18.59,22.64C18.97,22.46 19.15,22 18.95,21.63L17.28,18L19.69,17.55C19.85,17.5 20,17.43 20.12,17.29C20.39,16.97 20.35,16.5 20,16.21L11.26,8.86L11.25,8.87C11.12,8.76 10.95,8.69 10.76,8.69M15,10V8H20V10H15M13.83,4.76L16.66,1.93L18.07,3.34L15.24,6.17L13.83,4.76M10,0H12V5H10V0M3.93,14.66L6.76,11.83L8.17,13.24L5.34,16.07L3.93,14.66M3.93,3.34L5.34,1.93L8.17,4.76L6.76,6.17L3.93,3.34M7,10H2V8H7V10";
    var mdiGithub = "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z";
    var mdiLeafMaple = "M21.79,13L16,16L17,18L13,17.25V21H11V17.25L7,18L8,16L2.21,13L3.21,11.27L1.61,8L5.21,7.77L6.21,6L9.63,9.9L8,5H10L12,2L14,5H16L14.37,9.9L17.79,6L18.79,7.73L22.39,7.96L20.79,11.19L21.79,13Z";
    var mdiRayEndArrow = "M1,12L5,16V13H17.17C17.58,14.17 18.69,15 20,15A3,3 0 0,0 23,12A3,3 0 0,0 20,9C18.69,9 17.58,9.83 17.17,11H5V8L1,12Z";
    var mdiSnowflake = "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z";
    var mdiSourceBranchCheck = "M13 14C9.64 14 8.54 15.35 8.18 16.24C9.25 16.7 10 17.76 10 19C10 20.66 8.66 22 7 22S4 20.66 4 19C4 17.69 4.83 16.58 6 16.17V7.83C4.83 7.42 4 6.31 4 5C4 3.34 5.34 2 7 2S10 3.34 10 5C10 6.31 9.17 7.42 8 7.83V13.12C8.88 12.47 10.16 12 12 12C14.67 12 15.56 10.66 15.85 9.77C14.77 9.32 14 8.25 14 7C14 5.34 15.34 4 17 4S20 5.34 20 7C20 8.34 19.12 9.5 17.91 9.86C17.65 11.29 16.68 14 13 14M7 18C6.45 18 6 18.45 6 19S6.45 20 7 20 8 19.55 8 19 7.55 18 7 18M7 4C6.45 4 6 4.45 6 5S6.45 6 7 6 8 5.55 8 5 7.55 4 7 4M17 6C16.45 6 16 6.45 16 7S16.45 8 17 8 18 7.55 18 7 17.55 6 17 6M16.75 21.16L14 18.16L15.16 17L16.75 18.59L20.34 15L21.5 16.41L16.75 21.16";
    var mdiSprout = "M2,22V20C2,20 7,18 12,18C17,18 22,20 22,20V22H2M11.3,9.1C10.1,5.2 4,6.1 4,6.1C4,6.1 4.2,13.9 9.9,12.7C9.5,9.8 8,9 8,9C10.8,9 11,12.4 11,12.4V17C11.3,17 11.7,17 12,17C12.3,17 12.7,17 13,17V12.8C13,12.8 13,8.9 16,7.9C16,7.9 14,10.9 14,12.9C21,13.6 21,4 21,4C21,4 12.1,3 11.3,9.1Z";
    var mdiTextBoxRemoveOutline = "M14.46,15.88L15.88,14.46L18,16.59L20.12,14.46L21.54,15.88L19.41,18L21.54,20.12L20.12,21.54L18,19.41L15.88,21.54L14.46,20.12L16.59,18L14.46,15.88M5,3H19C20.11,3 21,3.89 21,5V12.8C20.39,12.45 19.72,12.2 19,12.08V5H5V19H12.08C12.2,19.72 12.45,20.39 12.8,21H5C3.89,21 3,20.11 3,19V5C3,3.89 3.89,3 5,3M7,7H17V9H7V7M7,11H17V12.08C16.15,12.22 15.37,12.54 14.68,13H7V11M7,15H12V17H7V15Z";
    var mdiWaves = "M20,12H22V14H20C18.62,14 17.26,13.65 16,13C13.5,14.3 10.5,14.3 8,13C6.74,13.65 5.37,14 4,14H2V12H4C5.39,12 6.78,11.53 8,10.67C10.44,12.38 13.56,12.38 16,10.67C17.22,11.53 18.61,12 20,12M20,6H22V8H20C18.62,8 17.26,7.65 16,7C13.5,8.3 10.5,8.3 8,7C6.74,7.65 5.37,8 4,8H2V6H4C5.39,6 6.78,5.53 8,4.67C10.44,6.38 13.56,6.38 16,4.67C17.22,5.53 18.61,6 20,6M20,18H22V20H20C18.62,20 17.26,19.65 16,19C13.5,20.3 10.5,20.3 8,19C6.74,19.65 5.37,20 4,20H2V18H4C5.39,18 6.78,17.53 8,16.67C10.44,18.38 13.56,18.38 16,16.67C17.22,17.53 18.61,18 20,18Z";

    /* src\component\Dropdown\NavItem.svelte generated by Svelte v3.55.1 */
    const file$U = "src\\component\\Dropdown\\NavItem.svelte";
    const get_trigger_slot_changes = dirty => ({});
    const get_trigger_slot_context = ctx => ({});

    // (44:6) {#if open}
    function create_if_block$d(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

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
    		id: create_if_block$d.name,
    		type: "if",
    		source: "(44:6) {#if open}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$11(ctx) {
    	let li;
    	let div;
    	let t_1;
    	let current;
    	let mounted;
    	let dispose;
    	const trigger_slot_template = /*#slots*/ ctx[5].trigger;
    	const trigger_slot = create_slot(trigger_slot_template, ctx, /*$$scope*/ ctx[4], get_trigger_slot_context);
    	let if_block = /*open*/ ctx[0] && create_if_block$d(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			div = element("div");
    			if (trigger_slot) trigger_slot.c();
    			t_1 = space();
    			if (if_block) if_block.c();
    			add_location(div, file$U, 39, 6, 912);
    			attr_dev(li, "class", "nav-item svelte-11x0clx");
    			add_location(li, file$U, 12, 2, 253);
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
    					listen_dev(li, "mouseenter", prevent_default(/*mouseenter_handler*/ ctx[6]), false, true, false),
    					listen_dev(li, "mouseleave", prevent_default(/*mouseleave_handler*/ ctx[7]), false, true, false),
    					listen_dev(li, "click", prevent_default(/*click_handler*/ ctx[8]), false, true, false),
    					listen_dev(li, "keypress", empty$5, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (trigger_slot) {
    				if (trigger_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						trigger_slot,
    						trigger_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(trigger_slot_template, /*$$scope*/ ctx[4], dirty, get_trigger_slot_changes),
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
    					if_block = create_if_block$d(ctx);
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
    		id: create_fragment$11.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$11($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavItem', slots, ['trigger','default']);
    	let { open = false } = $$props;
    	let open_pre = false;
    	let t;
    	let openTimerRunning = false;
    	let closeTimerRunning = false;
    	let { isMobile = false } = $$props;
    	const writable_props = ['open', 'isMobile'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavItem> was created with unknown prop '${key}'`);
    	});

    	const mouseenter_handler = () => {
    		if (!isMobile) {
    			$$invalidate(2, open_pre = true);
    			clearTimeout(t);

    			$$invalidate(3, t = setTimeout(
    				() => {
    					$$invalidate(0, open = open_pre);
    				},
    				300
    			));
    		}
    	};

    	const mouseleave_handler = () => {
    		if (!isMobile) {
    			$$invalidate(2, open_pre = false);
    			clearTimeout(t);

    			$$invalidate(3, t = setTimeout(
    				() => {
    					$$invalidate(0, open = open_pre);
    				},
    				300
    			));
    		}
    	};

    	const click_handler = () => {
    		if (isMobile) $$invalidate(0, open = !open);
    	};

    	$$self.$$set = $$props => {
    		if ('open' in $$props) $$invalidate(0, open = $$props.open);
    		if ('isMobile' in $$props) $$invalidate(1, isMobile = $$props.isMobile);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		empty: empty$5,
    		open,
    		open_pre,
    		t,
    		openTimerRunning,
    		closeTimerRunning,
    		isMobile
    	});

    	$$self.$inject_state = $$props => {
    		if ('open' in $$props) $$invalidate(0, open = $$props.open);
    		if ('open_pre' in $$props) $$invalidate(2, open_pre = $$props.open_pre);
    		if ('t' in $$props) $$invalidate(3, t = $$props.t);
    		if ('openTimerRunning' in $$props) openTimerRunning = $$props.openTimerRunning;
    		if ('closeTimerRunning' in $$props) closeTimerRunning = $$props.closeTimerRunning;
    		if ('isMobile' in $$props) $$invalidate(1, isMobile = $$props.isMobile);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		open,
    		isMobile,
    		open_pre,
    		t,
    		$$scope,
    		slots,
    		mouseenter_handler,
    		mouseleave_handler,
    		click_handler
    	];
    }

    class NavItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$11, create_fragment$11, safe_not_equal, { open: 0, isMobile: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavItem",
    			options,
    			id: create_fragment$11.name
    		});
    	}

    	get open() {
    		throw new Error("<NavItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<NavItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isMobile() {
    		throw new Error("<NavItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isMobile(value) {
    		throw new Error("<NavItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Icon\Icon.svelte generated by Svelte v3.55.1 */

    const file$T = "src\\component\\Icon\\Icon.svelte";

    // (20:4) {:else}
    function create_else_block$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*str*/ ctx[5]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*str*/ 32) set_data_dev(t, /*str*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(20:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (18:4) {#if str == ''}
    function create_if_block$c(ctx) {
    	let path_1;

    	const block = {
    		c: function create() {
    			path_1 = svg_element("path");
    			attr_dev(path_1, "d", /*path*/ ctx[4]);
    			attr_dev(path_1, "fill", /*color*/ ctx[2]);
    			add_location(path_1, file$T, 18, 4, 383);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*path*/ 16) {
    				attr_dev(path_1, "d", /*path*/ ctx[4]);
    			}

    			if (dirty & /*color*/ 4) {
    				attr_dev(path_1, "fill", /*color*/ ctx[2]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$c.name,
    		type: "if",
    		source: "(18:4) {#if str == ''}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$10(ctx) {
    	let svg;
    	let svg_class_value;
    	let svg_style_value;

    	function select_block_type(ctx, dirty) {
    		if (/*str*/ ctx[5] == '') return create_if_block$c;
    		return create_else_block$5;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if_block.c();
    			attr_dev(svg, "width", /*width*/ ctx[0]);
    			attr_dev(svg, "height", /*height*/ ctx[1]);
    			attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			attr_dev(svg, "class", svg_class_value = "" + (null_to_empty(/*$$props*/ ctx[6].class) + " svelte-113u7g9"));
    			attr_dev(svg, "style", svg_style_value = /*$$props*/ ctx[6].style);
    			add_location(svg, file$T, 10, 2, 251);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if_block.m(svg, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(svg, null);
    				}
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

    			if (dirty & /*$$props*/ 64 && svg_class_value !== (svg_class_value = "" + (null_to_empty(/*$$props*/ ctx[6].class) + " svelte-113u7g9"))) {
    				attr_dev(svg, "class", svg_class_value);
    			}

    			if (dirty & /*$$props*/ 64 && svg_style_value !== (svg_style_value = /*$$props*/ ctx[6].style)) {
    				attr_dev(svg, "style", svg_style_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if_block.d();
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon', slots, []);
    	let { size = '1.5em' } = $$props;
    	let { width = size } = $$props;
    	let { height = size } = $$props;
    	let { color = 'currentColor' } = $$props;
    	let { viewBox = '0 0 24 24' } = $$props;
    	let { path = '' } = $$props;
    	let { str = '' } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(6, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('size' in $$new_props) $$invalidate(7, size = $$new_props.size);
    		if ('width' in $$new_props) $$invalidate(0, width = $$new_props.width);
    		if ('height' in $$new_props) $$invalidate(1, height = $$new_props.height);
    		if ('color' in $$new_props) $$invalidate(2, color = $$new_props.color);
    		if ('viewBox' in $$new_props) $$invalidate(3, viewBox = $$new_props.viewBox);
    		if ('path' in $$new_props) $$invalidate(4, path = $$new_props.path);
    		if ('str' in $$new_props) $$invalidate(5, str = $$new_props.str);
    	};

    	$$self.$capture_state = () => ({
    		size,
    		width,
    		height,
    		color,
    		viewBox,
    		path,
    		str
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(6, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(7, size = $$new_props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$new_props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$new_props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$new_props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$new_props.viewBox);
    		if ('path' in $$props) $$invalidate(4, path = $$new_props.path);
    		if ('str' in $$props) $$invalidate(5, str = $$new_props.str);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [width, height, color, viewBox, path, str, $$props, size];
    }

    class Icon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$10, create_fragment$10, safe_not_equal, {
    			size: 7,
    			width: 0,
    			height: 1,
    			color: 2,
    			viewBox: 3,
    			path: 4,
    			str: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options,
    			id: create_fragment$10.name
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

    	get str() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set str(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Dropdown\IconButton.svelte generated by Svelte v3.55.1 */
    const file$S = "src\\component\\Dropdown\\IconButton.svelte";

    // (17:1) {:else}
    function create_else_block$4(ctx) {
    	let icon;
    	let current;

    	icon = new Icon({
    			props: { str: /*path*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(icon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(icon, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_changes = {};
    			if (dirty & /*path*/ 1) icon_changes.str = /*path*/ ctx[0];
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
    			destroy_component(icon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(17:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (15:1) {#if RightComment == "" }
    function create_if_block_1$5(ctx) {
    	let icon;
    	let current;

    	icon = new Icon({
    			props: { path: /*path*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(icon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(icon, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
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
    			destroy_component(icon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(15:1) {#if RightComment == \\\"\\\" }",
    		ctx
    	});

    	return block;
    }

    // (20:1) {#if showComment}
    function create_if_block$b(ctx) {
    	let div;
    	let t;
    	let div_intro;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*Comment*/ ctx[2]);
    			attr_dev(div, "class", "comment svelte-vzk5au");
    			add_location(div, file$S, 20, 1, 517);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*Comment*/ 4) set_data_dev(t, /*Comment*/ ctx[2]);
    		},
    		i: function intro(local) {
    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, blur, { duration: 200 });
    					div_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(20:1) {#if showComment}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$$(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block0;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_1$5, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*RightComment*/ ctx[1] == "") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let if_block1 = /*showComment*/ ctx[3] && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			attr_dev(div, "class", "icon-button svelte-vzk5au");
    			set_style(div, "border-radius", /*showComment*/ ctx[3] == '' ? '5px' : '5px');
    			add_location(div, file$S, 13, 0, 261);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			append_dev(div, t);
    			if (if_block1) if_block1.m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", prevent_default(/*click_handler*/ ctx[4]), false, true, false),
    					listen_dev(div, "keydown", empty$4, false, false, false),
    					listen_dev(div, "keyup", empty$4, false, false, false)
    				];

    				mounted = true;
    			}
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
    				if_block0 = if_blocks[current_block_type_index];

    				if (!if_block0) {
    					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block0.c();
    				} else {
    					if_block0.p(ctx, dirty);
    				}

    				transition_in(if_block0, 1);
    				if_block0.m(div, t);
    			}

    			if (/*showComment*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*showComment*/ 8) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$b(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (!current || dirty & /*showComment*/ 8) {
    				set_style(div, "border-radius", /*showComment*/ ctx[3] == '' ? '5px' : '5px');
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			run_all(dispose);
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

    function empty$4() {
    	
    }

    function instance$$($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('IconButton', slots, []);
    	let { path = '' } = $$props;
    	let { RightComment = "" } = $$props;
    	let { Comment = "" } = $$props;
    	let { showComment = false } = $$props;
    	const writable_props = ['path', 'RightComment', 'Comment', 'showComment'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<IconButton> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('path' in $$props) $$invalidate(0, path = $$props.path);
    		if ('RightComment' in $$props) $$invalidate(1, RightComment = $$props.RightComment);
    		if ('Comment' in $$props) $$invalidate(2, Comment = $$props.Comment);
    		if ('showComment' in $$props) $$invalidate(3, showComment = $$props.showComment);
    	};

    	$$self.$capture_state = () => ({
    		Icon,
    		blur,
    		path,
    		RightComment,
    		Comment,
    		showComment,
    		empty: empty$4
    	});

    	$$self.$inject_state = $$props => {
    		if ('path' in $$props) $$invalidate(0, path = $$props.path);
    		if ('RightComment' in $$props) $$invalidate(1, RightComment = $$props.RightComment);
    		if ('Comment' in $$props) $$invalidate(2, Comment = $$props.Comment);
    		if ('showComment' in $$props) $$invalidate(3, showComment = $$props.showComment);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [path, RightComment, Comment, showComment, click_handler];
    }

    class IconButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$$, create_fragment$$, safe_not_equal, {
    			path: 0,
    			RightComment: 1,
    			Comment: 2,
    			showComment: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "IconButton",
    			options,
    			id: create_fragment$$.name
    		});
    	}

    	get path() {
    		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get RightComment() {
    		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set RightComment(value) {
    		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get Comment() {
    		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set Comment(value) {
    		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showComment() {
    		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showComment(value) {
    		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Dropdown\MenuItem.svelte generated by Svelte v3.55.1 */
    const file$R = "src\\component\\Dropdown\\MenuItem.svelte";

    // (20:1) {:else}
    function create_else_block$3(ctx) {
    	let span;
    	let icon;
    	let current;

    	icon = new Icon({
    			props: { path: /*rightIcon*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(icon.$$.fragment);
    			attr_dev(span, "class", "icon-right");
    			add_location(span, file$R, 20, 1, 501);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(icon, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_changes = {};
    			if (dirty & /*rightIcon*/ 2) icon_changes.path = /*rightIcon*/ ctx[1];
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
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(20:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (16:1) {#if isChecked}
    function create_if_block$a(ctx) {
    	let span;
    	let icon;
    	let current;

    	icon = new Icon({
    			props: { path: mdiCheckBold$1 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(icon.$$.fragment);
    			attr_dev(span, "class", "icon-right");
    			add_location(span, file$R, 16, 2, 417);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(icon, span, null);
    			current = true;
    		},
    		p: noop,
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
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(16:1) {#if isChecked}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$_(ctx) {
    	let div;
    	let iconbutton;
    	let t0;
    	let t1;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	let mounted;
    	let dispose;

    	iconbutton = new IconButton({
    			props: { path: /*leftIcon*/ ctx[0] ?? '' },
    			$$inline: true
    		});

    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);
    	const if_block_creators = [create_if_block$a, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*isChecked*/ ctx[2]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(iconbutton.$$.fragment);
    			t0 = space();
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if_block.c();
    			attr_dev(div, "class", "menu-item svelte-1ty5qil");
    			add_location(div, file$R, 10, 0, 256);
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
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", prevent_default(/*click_handler*/ ctx[5]), false, true, false),
    					listen_dev(div, "keydown", empty$3, false, false, false),
    					listen_dev(div, "keyup", empty$3, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const iconbutton_changes = {};
    			if (dirty & /*leftIcon*/ 1) iconbutton_changes.path = /*leftIcon*/ ctx[0] ?? '';
    			iconbutton.$set(iconbutton_changes);

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
    				if_block.m(div, null);
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
    			if_blocks[current_block_type_index].d();
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

    function empty$3() {
    	
    }

    function instance$_($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MenuItem', slots, ['default']);
    	let { leftIcon = null } = $$props;
    	let { rightIcon = "" } = $$props;
    	let { isChecked } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (isChecked === undefined && !('isChecked' in $$props || $$self.$$.bound[$$self.$$.props['isChecked']])) {
    			console.warn("<MenuItem> was created without expected prop 'isChecked'");
    		}
    	});

    	const writable_props = ['leftIcon', 'rightIcon', 'isChecked'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MenuItem> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('leftIcon' in $$props) $$invalidate(0, leftIcon = $$props.leftIcon);
    		if ('rightIcon' in $$props) $$invalidate(1, rightIcon = $$props.rightIcon);
    		if ('isChecked' in $$props) $$invalidate(2, isChecked = $$props.isChecked);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Icon,
    		IconButton,
    		mdiCheckBold: mdiCheckBold$1,
    		leftIcon,
    		rightIcon,
    		isChecked,
    		empty: empty$3
    	});

    	$$self.$inject_state = $$props => {
    		if ('leftIcon' in $$props) $$invalidate(0, leftIcon = $$props.leftIcon);
    		if ('rightIcon' in $$props) $$invalidate(1, rightIcon = $$props.rightIcon);
    		if ('isChecked' in $$props) $$invalidate(2, isChecked = $$props.isChecked);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [leftIcon, rightIcon, isChecked, $$scope, slots, click_handler];
    }

    class MenuItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$_, create_fragment$_, safe_not_equal, { leftIcon: 0, rightIcon: 1, isChecked: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MenuItem",
    			options,
    			id: create_fragment$_.name
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

    	get isChecked() {
    		throw new Error("<MenuItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isChecked(value) {
    		throw new Error("<MenuItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Dropdown\DefaultMenu.svelte generated by Svelte v3.55.1 */
    const file$Q = "src\\component\\Dropdown\\DefaultMenu.svelte";

    function create_fragment$Z(ctx) {
    	let div;
    	let div_resize_listener;
    	let div_intro;
    	let div_outro;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "menu svelte-4jufdq");
    			add_render_callback(() => /*div_elementresize_handler*/ ctx[6].call(div));
    			add_location(div, file$Q, 10, 0, 232);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			div_resize_listener = add_resize_listener(div, /*div_elementresize_handler*/ ctx[6].bind(div));
    			current = true;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

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
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fly, { x: /*in_x*/ ctx[1] });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { x: /*out_x*/ ctx[2] });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			div_resize_listener();
    			if (detaching && div_outro) div_outro.end();
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
    	validate_slots('DefaultMenu', slots, ['default']);
    	let { height = null } = $$props;
    	let { in_x = -300 } = $$props;
    	let { out_x = -300 } = $$props;
    	let { activeMenu = "" } = $$props;
    	const writable_props = ['height', 'in_x', 'out_x', 'activeMenu'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DefaultMenu> was created with unknown prop '${key}'`);
    	});

    	function div_elementresize_handler() {
    		height = this.clientHeight;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('in_x' in $$props) $$invalidate(1, in_x = $$props.in_x);
    		if ('out_x' in $$props) $$invalidate(2, out_x = $$props.out_x);
    		if ('activeMenu' in $$props) $$invalidate(3, activeMenu = $$props.activeMenu);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		fly,
    		MenuItem,
    		height,
    		in_x,
    		out_x,
    		activeMenu
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('in_x' in $$props) $$invalidate(1, in_x = $$props.in_x);
    		if ('out_x' in $$props) $$invalidate(2, out_x = $$props.out_x);
    		if ('activeMenu' in $$props) $$invalidate(3, activeMenu = $$props.activeMenu);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [height, in_x, out_x, activeMenu, $$scope, slots, div_elementresize_handler];
    }

    class DefaultMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$Z, create_fragment$Z, safe_not_equal, {
    			height: 0,
    			in_x: 1,
    			out_x: 2,
    			activeMenu: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DefaultMenu",
    			options,
    			id: create_fragment$Z.name
    		});
    	}

    	get height() {
    		throw new Error("<DefaultMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<DefaultMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get in_x() {
    		throw new Error("<DefaultMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set in_x(value) {
    		throw new Error("<DefaultMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get out_x() {
    		throw new Error("<DefaultMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set out_x(value) {
    		throw new Error("<DefaultMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeMenu() {
    		throw new Error("<DefaultMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeMenu(value) {
    		throw new Error("<DefaultMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Dropdown\DropdownMenu.svelte generated by Svelte v3.55.1 */
    const file$P = "src\\component\\Dropdown\\DropdownMenu.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (13:2) {#if activeMenu == Config.Name}
    function create_if_block$9(ctx) {
    	let switch_instance;
    	let updating_height;
    	let updating_activeMenu;
    	let switch_instance_anchor;
    	let current;

    	function switch_instance_height_binding(value) {
    		/*switch_instance_height_binding*/ ctx[3](value);
    	}

    	function switch_instance_activeMenu_binding(value) {
    		/*switch_instance_activeMenu_binding*/ ctx[4](value);
    	}

    	var switch_value = /*Config*/ ctx[6].Component;

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		if (/*menuHeight*/ ctx[2] !== void 0) {
    			switch_instance_props.height = /*menuHeight*/ ctx[2];
    		}

    		if (/*activeMenu*/ ctx[0] !== void 0) {
    			switch_instance_props.activeMenu = /*activeMenu*/ ctx[0];
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    		binding_callbacks.push(() => bind(switch_instance, 'height', switch_instance_height_binding));
    		binding_callbacks.push(() => bind(switch_instance, 'activeMenu', switch_instance_activeMenu_binding));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty$5();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (!updating_height && dirty & /*menuHeight*/ 4) {
    				updating_height = true;
    				switch_instance_changes.height = /*menuHeight*/ ctx[2];
    				add_flush_callback(() => updating_height = false);
    			}

    			if (!updating_activeMenu && dirty & /*activeMenu*/ 1) {
    				updating_activeMenu = true;
    				switch_instance_changes.activeMenu = /*activeMenu*/ ctx[0];
    				add_flush_callback(() => updating_activeMenu = false);
    			}

    			if (switch_value !== (switch_value = /*Config*/ ctx[6].Component)) {
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
    					binding_callbacks.push(() => bind(switch_instance, 'height', switch_instance_height_binding));
    					binding_callbacks.push(() => bind(switch_instance, 'activeMenu', switch_instance_activeMenu_binding));
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
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(13:2) {#if activeMenu == Config.Name}",
    		ctx
    	});

    	return block;
    }

    // (12:1) {#each Menu as Config}
    function create_each_block$4(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*activeMenu*/ ctx[0] == /*Config*/ ctx[6].Name && create_if_block$9(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$5();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*activeMenu*/ ctx[0] == /*Config*/ ctx[6].Name) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*activeMenu, Menu*/ 3) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$9(ctx);
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
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(12:1) {#each Menu as Config}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$Y(ctx) {
    	let div;
    	let current;
    	let each_value = /*Menu*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "dropdown stack svelte-16xp54v");
    			set_style(div, "height", /*menuHeight*/ ctx[2] + "px");
    			add_location(div, file$P, 10, 0, 259);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Menu, menuHeight, activeMenu*/ 7) {
    				each_value = /*Menu*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*menuHeight*/ 4) {
    				set_style(div, "height", /*menuHeight*/ ctx[2] + "px");
    			}
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
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
    	validate_slots('DropdownMenu', slots, []);
    	let { Menu = [{ Name: 'main', Component: DefaultMenu }] } = $$props;
    	let { activeMenu = 'main' } = $$props;
    	let menuHeight = 0;
    	let menuEl = null;
    	const writable_props = ['Menu', 'activeMenu'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DropdownMenu> was created with unknown prop '${key}'`);
    	});

    	function switch_instance_height_binding(value) {
    		menuHeight = value;
    		$$invalidate(2, menuHeight);
    	}

    	function switch_instance_activeMenu_binding(value) {
    		activeMenu = value;
    		$$invalidate(0, activeMenu);
    	}

    	$$self.$$set = $$props => {
    		if ('Menu' in $$props) $$invalidate(1, Menu = $$props.Menu);
    		if ('activeMenu' in $$props) $$invalidate(0, activeMenu = $$props.activeMenu);
    	};

    	$$self.$capture_state = () => ({
    		fly,
    		DefaultMenu,
    		Menu,
    		activeMenu,
    		menuHeight,
    		menuEl
    	});

    	$$self.$inject_state = $$props => {
    		if ('Menu' in $$props) $$invalidate(1, Menu = $$props.Menu);
    		if ('activeMenu' in $$props) $$invalidate(0, activeMenu = $$props.activeMenu);
    		if ('menuHeight' in $$props) $$invalidate(2, menuHeight = $$props.menuHeight);
    		if ('menuEl' in $$props) menuEl = $$props.menuEl;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		activeMenu,
    		Menu,
    		menuHeight,
    		switch_instance_height_binding,
    		switch_instance_activeMenu_binding
    	];
    }

    class DropdownMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$Y, create_fragment$Y, safe_not_equal, { Menu: 1, activeMenu: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DropdownMenu",
    			options,
    			id: create_fragment$Y.name
    		});
    	}

    	get Menu() {
    		throw new Error("<DropdownMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set Menu(value) {
    		throw new Error("<DropdownMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeMenu() {
    		throw new Error("<DropdownMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeMenu(value) {
    		throw new Error("<DropdownMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Switch\ToggleSwitch.svelte generated by Svelte v3.55.1 */

    const file$O = "src\\component\\Switch\\ToggleSwitch.svelte";

    function get_each_context$3(ctx, list, i) {
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
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
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
    			add_location(div0, file$O, 57, 4, 1567);
    			attr_dev(div1, "role", "radiogroup");
    			attr_dev(div1, "class", "group-container svelte-16iwb3c");
    			attr_dev(div1, "aria-labelledby", `label-${/*uniqueID*/ ctx[6]}`);
    			set_style(div1, "font-size", /*fontSize*/ ctx[5] + "px");
    			attr_dev(div1, "id", `group-${/*uniqueID*/ ctx[6]}`);
    			add_location(div1, file$O, 52, 4, 1395);
    			attr_dev(div2, "class", "s s--multi svelte-16iwb3c");
    			add_location(div2, file$O, 51, 0, 1365);
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
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
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
    function create_if_block_1$4(ctx) {
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
    			add_location(span, file$O, 42, 4, 1136);
    			attr_dev(button, "role", "switch");
    			attr_dev(button, "aria-checked", /*checked*/ ctx[1]);
    			attr_dev(button, "aria-labelledby", `switch-${/*uniqueID*/ ctx[6]}`);
    			attr_dev(button, "class", "svelte-16iwb3c");
    			add_location(button, file$O, 43, 4, 1188);
    			attr_dev(div, "class", "s s--slider svelte-16iwb3c");
    			set_style(div, "font-size", /*fontSize*/ ctx[5] + "px");
    			add_location(div, file$O, 41, 0, 1074);
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
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(41:29) ",
    		ctx
    	});

    	return block;
    }

    // (29:0) {#if design == 'inner'}
    function create_if_block$8(ctx) {
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
    			attr_dev(span0, "class", "svelte-16iwb3c");
    			add_location(span0, file$O, 30, 4, 764);
    			attr_dev(span1, "class", "svelte-16iwb3c");
    			add_location(span1, file$O, 36, 12, 973);
    			attr_dev(span2, "class", "svelte-16iwb3c");
    			add_location(span2, file$O, 37, 12, 1002);
    			attr_dev(button, "role", "switch");
    			attr_dev(button, "aria-checked", /*checked*/ ctx[1]);
    			attr_dev(button, "aria-labelledby", `switch-${/*uniqueID*/ ctx[6]}`);
    			attr_dev(button, "class", "svelte-16iwb3c");
    			add_location(button, file$O, 31, 4, 816);
    			attr_dev(div, "class", "s s--inner svelte-16iwb3c");
    			add_location(div, file$O, 29, 0, 734);
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
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(29:0) {#if design == 'inner'}",
    		ctx
    	});

    	return block;
    }

    // (59:8) {#each options as option}
    function create_each_block$3(ctx) {
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
    			attr_dev(input, "class", "svelte-16iwb3c");
    			/*$$binding_groups*/ ctx[10][0].push(input);
    			add_location(input, file$O, 59, 12, 1674);
    			attr_dev(label_1, "for", label_1_for_value = `${/*option*/ ctx[12]}-${/*uniqueID*/ ctx[6]}`);
    			attr_dev(label_1, "class", "svelte-16iwb3c");
    			add_location(label_1, file$O, 60, 12, 1771);
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
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(59:8) {#each options as option}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$X(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*design*/ ctx[3] == 'inner') return create_if_block$8;
    		if (/*design*/ ctx[3] == 'slider') return create_if_block_1$4;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$5();
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
    		id: create_fragment$X.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$X($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$X, create_fragment$X, safe_not_equal, {
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
    			id: create_fragment$X.name
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

    /* src\component\NavProfile.svelte generated by Svelte v3.55.1 */
    const file$N = "src\\component\\NavProfile.svelte";

    // (38:4) 
    function create_trigger_slot$4(ctx) {
    	let span;
    	let iconbutton;
    	let updating_showComment;
    	let current;
    	let mounted;
    	let dispose;

    	function iconbutton_showComment_binding(value) {
    		/*iconbutton_showComment_binding*/ ctx[4](value);
    	}

    	let iconbutton_props = { path: mdiAccountBox, Comment: "Profile" };

    	if (/*isOpen*/ ctx[0] !== void 0) {
    		iconbutton_props.showComment = /*isOpen*/ ctx[0];
    	}

    	iconbutton = new IconButton({ props: iconbutton_props, $$inline: true });
    	binding_callbacks.push(() => bind(iconbutton, 'showComment', iconbutton_showComment_binding));

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(iconbutton.$$.fragment);
    			attr_dev(span, "slot", "trigger");
    			add_location(span, file$N, 37, 4, 1159);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(iconbutton, span, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(span, "click", /*click_handler*/ ctx[5], false, false, false),
    					listen_dev(span, "keypress", empty$2, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const iconbutton_changes = {};

    			if (!updating_showComment && dirty & /*isOpen*/ 1) {
    				updating_showComment = true;
    				iconbutton_changes.showComment = /*isOpen*/ ctx[0];
    				add_flush_callback(() => updating_showComment = false);
    			}

    			iconbutton.$set(iconbutton_changes);
    		},
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
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_trigger_slot$4.name,
    		type: "slot",
    		source: "(38:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$W(ctx) {
    	let div;
    	let navitem;
    	let updating_open;
    	let div_intro;
    	let current;

    	function navitem_open_binding(value) {
    		/*navitem_open_binding*/ ctx[6](value);
    	}

    	let navitem_props = {
    		isMobile: /*$Device*/ ctx[3]["isMobile"],
    		$$slots: { trigger: [create_trigger_slot$4] },
    		$$scope: { ctx }
    	};

    	if (/*isOpen*/ ctx[0] !== void 0) {
    		navitem_props.open = /*isOpen*/ ctx[0];
    	}

    	navitem = new NavItem({ props: navitem_props, $$inline: true });
    	binding_callbacks.push(() => bind(navitem, 'open', navitem_open_binding));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navitem.$$.fragment);
    			attr_dev(div, "class", "Profile svelte-13bnfrv");
    			set_style(div, "height", /*height*/ ctx[1] + "px");
    			add_location(div, file$N, 35, 0, 1015);
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
    			if (dirty & /*$Device*/ 8) navitem_changes.isMobile = /*$Device*/ ctx[3]["isMobile"];

    			if (dirty & /*$$scope, pushFunc, isOpen*/ 4101) {
    				navitem_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*isOpen*/ 1) {
    				updating_open = true;
    				navitem_changes.open = /*isOpen*/ ctx[0];
    				add_flush_callback(() => updating_open = false);
    			}

    			navitem.$set(navitem_changes);

    			if (!current || dirty & /*height*/ 2) {
    				set_style(div, "height", /*height*/ ctx[1] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navitem.$$.fragment, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, { delay: 100 });
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
    		id: create_fragment$W.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function empty$2() {
    	
    }

    function instance$W($$self, $$props, $$invalidate) {
    	let $ContextVisible;
    	let $Device;
    	validate_store(ContextVisible, 'ContextVisible');
    	component_subscribe($$self, ContextVisible, $$value => $$invalidate(8, $ContextVisible = $$value));
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(3, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavProfile', slots, []);
    	let SwitchStatus = $ContextVisible;
    	let width = 0;
    	let { height = 0 } = $$props;
    	let { isOpen = false } = $$props;
    	let { pushFunc } = $$props;
    	let UIStatus = {};

    	function SetUIStatus(UIType) {
    		for (var key in UIStatus) {
    			UIStatus[key] = "";
    		}

    		UIStatus[UIType] = mdiCheckBold;
    	} // if( $Device["isMobile"] ){
    	//     isOpen = false;

    	onMount(() => {
    		
    	});

    	$$self.$$.on_mount.push(function () {
    		if (pushFunc === undefined && !('pushFunc' in $$props || $$self.$$.bound[$$self.$$.props['pushFunc']])) {
    			console.warn("<NavProfile> was created without expected prop 'pushFunc'");
    		}
    	});

    	const writable_props = ['height', 'isOpen', 'pushFunc'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavProfile> was created with unknown prop '${key}'`);
    	});

    	function iconbutton_showComment_binding(value) {
    		isOpen = value;
    		$$invalidate(0, isOpen);
    	}

    	const click_handler = event => pushFunc("/profile");

    	function navitem_open_binding(value) {
    		isOpen = value;
    		$$invalidate(0, isOpen);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$props.isOpen);
    		if ('pushFunc' in $$props) $$invalidate(2, pushFunc = $$props.pushFunc);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		Device,
    		ContextVisible,
    		season,
    		mdiAccountBox,
    		NavItem,
    		DropdownMenu,
    		IconButton,
    		MenuItem,
    		jquery: jquery__default["default"],
    		onMount,
    		ToggleSwitch,
    		SwitchStatus,
    		width,
    		height,
    		isOpen,
    		pushFunc,
    		UIStatus,
    		SetUIStatus,
    		empty: empty$2,
    		$ContextVisible,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('SwitchStatus' in $$props) SwitchStatus = $$props.SwitchStatus;
    		if ('width' in $$props) width = $$props.width;
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$props.isOpen);
    		if ('pushFunc' in $$props) $$invalidate(2, pushFunc = $$props.pushFunc);
    		if ('UIStatus' in $$props) UIStatus = $$props.UIStatus;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isOpen,
    		height,
    		pushFunc,
    		$Device,
    		iconbutton_showComment_binding,
    		click_handler,
    		navitem_open_binding
    	];
    }

    class NavProfile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$W, create_fragment$W, safe_not_equal, { height: 1, isOpen: 0, pushFunc: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavProfile",
    			options,
    			id: create_fragment$W.name
    		});
    	}

    	get height() {
    		throw new Error("<NavProfile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<NavProfile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		throw new Error("<NavProfile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error("<NavProfile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pushFunc() {
    		throw new Error("<NavProfile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pushFunc(value) {
    		throw new Error("<NavProfile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\NavGithub.svelte generated by Svelte v3.55.1 */
    const file$M = "src\\component\\NavGithub.svelte";

    // (39:4) 
    function create_trigger_slot$3(ctx) {
    	let span;
    	let iconbutton;
    	let updating_showComment;
    	let current;

    	function iconbutton_showComment_binding(value) {
    		/*iconbutton_showComment_binding*/ ctx[3](value);
    	}

    	let iconbutton_props = { path: mdiGithub, Comment: "Github" };

    	if (/*isOpen*/ ctx[0] !== void 0) {
    		iconbutton_props.showComment = /*isOpen*/ ctx[0];
    	}

    	iconbutton = new IconButton({ props: iconbutton_props, $$inline: true });
    	binding_callbacks.push(() => bind(iconbutton, 'showComment', iconbutton_showComment_binding));

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(iconbutton.$$.fragment);
    			attr_dev(span, "slot", "trigger");
    			add_location(span, file$M, 38, 4, 1174);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(iconbutton, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const iconbutton_changes = {};

    			if (!updating_showComment && dirty & /*isOpen*/ 1) {
    				updating_showComment = true;
    				iconbutton_changes.showComment = /*isOpen*/ ctx[0];
    				add_flush_callback(() => updating_showComment = false);
    			}

    			iconbutton.$set(iconbutton_changes);
    		},
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
    		id: create_trigger_slot$3.name,
    		type: "slot",
    		source: "(39:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$V(ctx) {
    	let div;
    	let navitem;
    	let updating_open;
    	let div_intro;
    	let current;

    	function navitem_open_binding(value) {
    		/*navitem_open_binding*/ ctx[4](value);
    	}

    	let navitem_props = {
    		isMobile: /*$Device*/ ctx[2]["isMobile"],
    		$$slots: { trigger: [create_trigger_slot$3] },
    		$$scope: { ctx }
    	};

    	if (/*isOpen*/ ctx[0] !== void 0) {
    		navitem_props.open = /*isOpen*/ ctx[0];
    	}

    	navitem = new NavItem({ props: navitem_props, $$inline: true });
    	binding_callbacks.push(() => bind(navitem, 'open', navitem_open_binding));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navitem.$$.fragment);
    			attr_dev(div, "class", "Git svelte-grxjvo");
    			set_style(div, "height", /*height*/ ctx[1] + "px");
    			add_location(div, file$M, 36, 0, 1034);
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
    			if (dirty & /*$Device*/ 4) navitem_changes.isMobile = /*$Device*/ ctx[2]["isMobile"];

    			if (dirty & /*$$scope, isOpen*/ 2049) {
    				navitem_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*isOpen*/ 1) {
    				updating_open = true;
    				navitem_changes.open = /*isOpen*/ ctx[0];
    				add_flush_callback(() => updating_open = false);
    			}

    			navitem.$set(navitem_changes);

    			if (!current || dirty & /*height*/ 2) {
    				set_style(div, "height", /*height*/ ctx[1] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navitem.$$.fragment, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, { delay: 100 });
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
    		id: create_fragment$V.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$V($$self, $$props, $$invalidate) {
    	let $ContextVisible;
    	let $Device;
    	validate_store(ContextVisible, 'ContextVisible');
    	component_subscribe($$self, ContextVisible, $$value => $$invalidate(6, $ContextVisible = $$value));
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(2, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavGithub', slots, []);
    	let SwitchStatus = $ContextVisible;
    	let width = 0;
    	let { height = 0 } = $$props;
    	let { isOpen = false } = $$props;
    	let UIStatus = {};

    	function SetUIStatus(UIType) {
    		for (var key in UIStatus) {
    			UIStatus[key] = "";
    		}

    		UIStatus[UIType] = mdiCheckBold;
    	} // if( $Device["isMobile"] ){
    	//     isOpen = false;

    	// }
    	function test() {
    		return isOpen ? "Select UI" : "";
    	}

    	onMount(() => {
    		
    	});

    	const writable_props = ['height', 'isOpen'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavGithub> was created with unknown prop '${key}'`);
    	});

    	function iconbutton_showComment_binding(value) {
    		isOpen = value;
    		$$invalidate(0, isOpen);
    	}

    	function navitem_open_binding(value) {
    		isOpen = value;
    		$$invalidate(0, isOpen);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$props.isOpen);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		Device,
    		ContextVisible,
    		season,
    		mdiGithub,
    		NavItem,
    		DropdownMenu,
    		IconButton,
    		MenuItem,
    		jquery: jquery__default["default"],
    		onMount,
    		ToggleSwitch,
    		SwitchStatus,
    		width,
    		height,
    		isOpen,
    		UIStatus,
    		SetUIStatus,
    		test,
    		$ContextVisible,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('SwitchStatus' in $$props) SwitchStatus = $$props.SwitchStatus;
    		if ('width' in $$props) width = $$props.width;
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$props.isOpen);
    		if ('UIStatus' in $$props) UIStatus = $$props.UIStatus;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isOpen, height, $Device, iconbutton_showComment_binding, navitem_open_binding];
    }

    class NavGithub extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$V, create_fragment$V, safe_not_equal, { height: 1, isOpen: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavGithub",
    			options,
    			id: create_fragment$V.name
    		});
    	}

    	get height() {
    		throw new Error("<NavGithub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<NavGithub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		throw new Error("<NavGithub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error("<NavGithub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\DropdownMenus\Outsourcing_Main.svelte generated by Svelte v3.55.1 */

    // (13:4) <MenuItem on:click={() => {          activeMenu = "2022"      }}  leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >
    function create_default_slot_2$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("2022");
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
    		id: create_default_slot_2$6.name,
    		type: "slot",
    		source: "(13:4) <MenuItem on:click={() => {          activeMenu = \\\"2022\\\"      }}  leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (16:4) <MenuItem on:click={() => {          activeMenu = "2023"      }}   leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >
    function create_default_slot_1$7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("2023");
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
    		id: create_default_slot_1$7.name,
    		type: "slot",
    		source: "(16:4) <MenuItem on:click={() => {          activeMenu = \\\"2023\\\"      }}   leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (12:0) <MenuFrame bind:height={height}>
    function create_default_slot$y(ctx) {
    	let menuitem0;
    	let t;
    	let menuitem1;
    	let current;

    	menuitem0 = new MenuItem({
    			props: {
    				leftIcon: mdiCalendarMonthOutline,
    				rightIcon: mdiChevronRight,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_2$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem0.$on("click", /*click_handler*/ ctx[2]);

    	menuitem1 = new MenuItem({
    			props: {
    				leftIcon: mdiCalendarMonthOutline,
    				rightIcon: mdiChevronRight,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_1$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem1.$on("click", /*click_handler_1*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(menuitem0.$$.fragment);
    			t = space();
    			create_component(menuitem1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuitem0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(menuitem1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const menuitem0_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				menuitem0_changes.$$scope = { dirty, ctx };
    			}

    			menuitem0.$set(menuitem0_changes);
    			const menuitem1_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				menuitem1_changes.$$scope = { dirty, ctx };
    			}

    			menuitem1.$set(menuitem1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuitem0.$$.fragment, local);
    			transition_in(menuitem1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuitem0.$$.fragment, local);
    			transition_out(menuitem1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuitem0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(menuitem1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$y.name,
    		type: "slot",
    		source: "(12:0) <MenuFrame bind:height={height}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$U(ctx) {
    	let menuframe;
    	let updating_height;
    	let current;

    	function menuframe_height_binding(value) {
    		/*menuframe_height_binding*/ ctx[4](value);
    	}

    	let menuframe_props = {
    		$$slots: { default: [create_default_slot$y] },
    		$$scope: { ctx }
    	};

    	if (/*height*/ ctx[0] !== void 0) {
    		menuframe_props.height = /*height*/ ctx[0];
    	}

    	menuframe = new DefaultMenu({ props: menuframe_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuframe, 'height', menuframe_height_binding));

    	const block = {
    		c: function create() {
    			create_component(menuframe.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuframe, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const menuframe_changes = {};

    			if (dirty & /*$$scope, activeMenu*/ 34) {
    				menuframe_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_height && dirty & /*height*/ 1) {
    				updating_height = true;
    				menuframe_changes.height = /*height*/ ctx[0];
    				add_flush_callback(() => updating_height = false);
    			}

    			menuframe.$set(menuframe_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuframe.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuframe.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuframe, detaching);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Outsourcing_Main', slots, []);
    	let { height } = $$props;
    	let { activeMenu } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (height === undefined && !('height' in $$props || $$self.$$.bound[$$self.$$.props['height']])) {
    			console.warn("<Outsourcing_Main> was created without expected prop 'height'");
    		}

    		if (activeMenu === undefined && !('activeMenu' in $$props || $$self.$$.bound[$$self.$$.props['activeMenu']])) {
    			console.warn("<Outsourcing_Main> was created without expected prop 'activeMenu'");
    		}
    	});

    	const writable_props = ['height', 'activeMenu'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Outsourcing_Main> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(1, activeMenu = "2022");
    	};

    	const click_handler_1 = () => {
    		$$invalidate(1, activeMenu = "2023");
    	};

    	function menuframe_height_binding(value) {
    		height = value;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    	};

    	$$self.$capture_state = () => ({
    		season,
    		mdiCalendarMonthOutline,
    		mdiChevronRight,
    		MenuItem,
    		MenuFrame: DefaultMenu,
    		onMount,
    		height,
    		activeMenu
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [height, activeMenu, click_handler, click_handler_1, menuframe_height_binding];
    }

    class Outsourcing_Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$U, create_fragment$U, safe_not_equal, { height: 0, activeMenu: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Outsourcing_Main",
    			options,
    			id: create_fragment$U.name
    		});
    	}

    	get height() {
    		throw new Error("<Outsourcing_Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Outsourcing_Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeMenu() {
    		throw new Error("<Outsourcing_Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeMenu(value) {
    		throw new Error("<Outsourcing_Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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

    const { Error: Error_1, Object: Object_1, console: console_1$3 } = globals;

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
    			switch_instance_anchor = empty$5();
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
    function create_if_block$7(ctx) {
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
    			switch_instance_anchor = empty$5();
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
    		id: create_if_block$7.name,
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
    	const if_block_creators = [create_if_block$7, create_else_block$1];
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
    			if_block_anchor = empty$5();
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
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$3.warn(`<Router> was created with unknown prop '${key}'`);
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

    /* src\component\DropdownMenus\Outsourcing_2022.svelte generated by Svelte v3.55.1 */

    // (34:4) <MenuItem on:click={() => {          activeMenu = "main"      }}  leftIcon={mdiArrowLeft} isChecked={false} >
    function create_default_slot_4$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Back");
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
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(34:4) <MenuItem on:click={() => {          activeMenu = \\\"main\\\"      }}  leftIcon={mdiArrowLeft} isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (37:4) <MenuItem on:click={() => {          pushRouter("/outsourcing/2022/picam")          rerandering();      }}  leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["picam"]} >
    function create_default_slot_3$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Picamera");
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
    		id: create_default_slot_3$5.name,
    		type: "slot",
    		source: "(37:4) <MenuItem on:click={() => {          pushRouter(\\\"/outsourcing/2022/picam\\\")          rerandering();      }}  leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked[\\\"picam\\\"]} >",
    		ctx
    	});

    	return block;
    }

    // (41:4) <MenuItem on:click={() => {          pushRouter("/outsourcing/2022/calculator")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["calculator"]}>
    function create_default_slot_2$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Calculator");
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
    		id: create_default_slot_2$5.name,
    		type: "slot",
    		source: "(41:4) <MenuItem on:click={() => {          pushRouter(\\\"/outsourcing/2022/calculator\\\")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked[\\\"calculator\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (45:4) <MenuItem on:click={() => {          pushRouter("/outsourcing/2022/navigation")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["navigation"]}>
    function create_default_slot_1$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Navigation");
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
    		id: create_default_slot_1$6.name,
    		type: "slot",
    		source: "(45:4) <MenuItem on:click={() => {          pushRouter(\\\"/outsourcing/2022/navigation\\\")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked[\\\"navigation\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (33:0) <MenuFrame bind:height={height} in_x={300} out_x={300}>
    function create_default_slot$x(ctx) {
    	let menuitem0;
    	let t0;
    	let menuitem1;
    	let updating_isChecked;
    	let t1;
    	let menuitem2;
    	let updating_isChecked_1;
    	let t2;
    	let menuitem3;
    	let updating_isChecked_2;
    	let current;

    	menuitem0 = new MenuItem({
    			props: {
    				leftIcon: mdiArrowLeft,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_4$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem0.$on("click", /*click_handler*/ ctx[5]);

    	function menuitem1_isChecked_binding(value) {
    		/*menuitem1_isChecked_binding*/ ctx[6](value);
    	}

    	let menuitem1_props = {
    		leftIcon: mdiCalendarMonthOutline,
    		$$slots: { default: [create_default_slot_3$5] },
    		$$scope: { ctx }
    	};

    	if (/*isChecked*/ ctx[2]["picam"] !== void 0) {
    		menuitem1_props.isChecked = /*isChecked*/ ctx[2]["picam"];
    	}

    	menuitem1 = new MenuItem({ props: menuitem1_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuitem1, 'isChecked', menuitem1_isChecked_binding));
    	menuitem1.$on("click", /*click_handler_1*/ ctx[7]);

    	function menuitem2_isChecked_binding(value) {
    		/*menuitem2_isChecked_binding*/ ctx[8](value);
    	}

    	let menuitem2_props = {
    		leftIcon: mdiCalendarMonthOutline,
    		$$slots: { default: [create_default_slot_2$5] },
    		$$scope: { ctx }
    	};

    	if (/*isChecked*/ ctx[2]["calculator"] !== void 0) {
    		menuitem2_props.isChecked = /*isChecked*/ ctx[2]["calculator"];
    	}

    	menuitem2 = new MenuItem({ props: menuitem2_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuitem2, 'isChecked', menuitem2_isChecked_binding));
    	menuitem2.$on("click", /*click_handler_2*/ ctx[9]);

    	function menuitem3_isChecked_binding(value) {
    		/*menuitem3_isChecked_binding*/ ctx[10](value);
    	}

    	let menuitem3_props = {
    		leftIcon: mdiCalendarMonthOutline,
    		$$slots: { default: [create_default_slot_1$6] },
    		$$scope: { ctx }
    	};

    	if (/*isChecked*/ ctx[2]["navigation"] !== void 0) {
    		menuitem3_props.isChecked = /*isChecked*/ ctx[2]["navigation"];
    	}

    	menuitem3 = new MenuItem({ props: menuitem3_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuitem3, 'isChecked', menuitem3_isChecked_binding));
    	menuitem3.$on("click", /*click_handler_3*/ ctx[11]);

    	const block = {
    		c: function create() {
    			create_component(menuitem0.$$.fragment);
    			t0 = space();
    			create_component(menuitem1.$$.fragment);
    			t1 = space();
    			create_component(menuitem2.$$.fragment);
    			t2 = space();
    			create_component(menuitem3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuitem0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(menuitem1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(menuitem2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(menuitem3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const menuitem0_changes = {};

    			if (dirty & /*$$scope*/ 16384) {
    				menuitem0_changes.$$scope = { dirty, ctx };
    			}

    			menuitem0.$set(menuitem0_changes);
    			const menuitem1_changes = {};

    			if (dirty & /*$$scope*/ 16384) {
    				menuitem1_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_isChecked && dirty & /*isChecked*/ 4) {
    				updating_isChecked = true;
    				menuitem1_changes.isChecked = /*isChecked*/ ctx[2]["picam"];
    				add_flush_callback(() => updating_isChecked = false);
    			}

    			menuitem1.$set(menuitem1_changes);
    			const menuitem2_changes = {};

    			if (dirty & /*$$scope*/ 16384) {
    				menuitem2_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_isChecked_1 && dirty & /*isChecked*/ 4) {
    				updating_isChecked_1 = true;
    				menuitem2_changes.isChecked = /*isChecked*/ ctx[2]["calculator"];
    				add_flush_callback(() => updating_isChecked_1 = false);
    			}

    			menuitem2.$set(menuitem2_changes);
    			const menuitem3_changes = {};

    			if (dirty & /*$$scope*/ 16384) {
    				menuitem3_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_isChecked_2 && dirty & /*isChecked*/ 4) {
    				updating_isChecked_2 = true;
    				menuitem3_changes.isChecked = /*isChecked*/ ctx[2]["navigation"];
    				add_flush_callback(() => updating_isChecked_2 = false);
    			}

    			menuitem3.$set(menuitem3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuitem0.$$.fragment, local);
    			transition_in(menuitem1.$$.fragment, local);
    			transition_in(menuitem2.$$.fragment, local);
    			transition_in(menuitem3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuitem0.$$.fragment, local);
    			transition_out(menuitem1.$$.fragment, local);
    			transition_out(menuitem2.$$.fragment, local);
    			transition_out(menuitem3.$$.fragment, local);
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
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$x.name,
    		type: "slot",
    		source: "(33:0) <MenuFrame bind:height={height} in_x={300} out_x={300}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$S(ctx) {
    	let menuframe;
    	let updating_height;
    	let current;

    	function menuframe_height_binding(value) {
    		/*menuframe_height_binding*/ ctx[12](value);
    	}

    	let menuframe_props = {
    		in_x: 300,
    		out_x: 300,
    		$$slots: { default: [create_default_slot$x] },
    		$$scope: { ctx }
    	};

    	if (/*height*/ ctx[0] !== void 0) {
    		menuframe_props.height = /*height*/ ctx[0];
    	}

    	menuframe = new DefaultMenu({ props: menuframe_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuframe, 'height', menuframe_height_binding));

    	const block = {
    		c: function create() {
    			create_component(menuframe.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuframe, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const menuframe_changes = {};

    			if (dirty & /*$$scope, isChecked, activeMenu*/ 16390) {
    				menuframe_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_height && dirty & /*height*/ 1) {
    				updating_height = true;
    				menuframe_changes.height = /*height*/ ctx[0];
    				add_flush_callback(() => updating_height = false);
    			}

    			menuframe.$set(menuframe_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuframe.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuframe.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuframe, detaching);
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

    function instance$S($$self, $$props, $$invalidate) {
    	let $LastPage;
    	validate_store(LastPage, 'LastPage');
    	component_subscribe($$self, LastPage, $$value => $$invalidate(13, $LastPage = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Outsourcing_2022', slots, []);
    	let { height } = $$props;
    	let { activeMenu } = $$props;
    	let isChecked = {};

    	function rerandering() {
    		for (var i in isChecked) $$invalidate(2, isChecked[i] = false, isChecked);
    		$$invalidate(2, isChecked[$LastPage["Layer3"]] = true, isChecked);
    	}

    	function pushRouter(link) {
    		link = link.toLowerCase();
    		var layers = link.split('/');

    		for (let i = 0; i < layers.length; i++) {
    			set_store_value(LastPage, $LastPage["Layer" + i.toString()] = layers[i], $LastPage);
    		}

    		push(link);
    	}

    	onMount(() => {
    		rerandering();
    	});

    	$$self.$$.on_mount.push(function () {
    		if (height === undefined && !('height' in $$props || $$self.$$.bound[$$self.$$.props['height']])) {
    			console.warn("<Outsourcing_2022> was created without expected prop 'height'");
    		}

    		if (activeMenu === undefined && !('activeMenu' in $$props || $$self.$$.bound[$$self.$$.props['activeMenu']])) {
    			console.warn("<Outsourcing_2022> was created without expected prop 'activeMenu'");
    		}
    	});

    	const writable_props = ['height', 'activeMenu'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Outsourcing_2022> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(1, activeMenu = "main");
    	};

    	function menuitem1_isChecked_binding(value) {
    		if ($$self.$$.not_equal(isChecked["picam"], value)) {
    			isChecked["picam"] = value;
    			$$invalidate(2, isChecked);
    		}
    	}

    	const click_handler_1 = () => {
    		pushRouter("/outsourcing/2022/picam");
    		rerandering();
    	};

    	function menuitem2_isChecked_binding(value) {
    		if ($$self.$$.not_equal(isChecked["calculator"], value)) {
    			isChecked["calculator"] = value;
    			$$invalidate(2, isChecked);
    		}
    	}

    	const click_handler_2 = () => {
    		pushRouter("/outsourcing/2022/calculator");
    		rerandering();
    	};

    	function menuitem3_isChecked_binding(value) {
    		if ($$self.$$.not_equal(isChecked["navigation"], value)) {
    			isChecked["navigation"] = value;
    			$$invalidate(2, isChecked);
    		}
    	}

    	const click_handler_3 = () => {
    		pushRouter("/outsourcing/2022/navigation");
    		rerandering();
    	};

    	function menuframe_height_binding(value) {
    		height = value;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    	};

    	$$self.$capture_state = () => ({
    		LastPage,
    		season,
    		mdiArrowLeft,
    		mdiCalendarMonthOutline,
    		mdiChevronRight,
    		MenuItem,
    		MenuFrame: DefaultMenu,
    		push,
    		onMount,
    		height,
    		activeMenu,
    		isChecked,
    		rerandering,
    		pushRouter,
    		$LastPage
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    		if ('isChecked' in $$props) $$invalidate(2, isChecked = $$props.isChecked);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		height,
    		activeMenu,
    		isChecked,
    		rerandering,
    		pushRouter,
    		click_handler,
    		menuitem1_isChecked_binding,
    		click_handler_1,
    		menuitem2_isChecked_binding,
    		click_handler_2,
    		menuitem3_isChecked_binding,
    		click_handler_3,
    		menuframe_height_binding
    	];
    }

    class Outsourcing_2022 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$S, create_fragment$S, safe_not_equal, { height: 0, activeMenu: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Outsourcing_2022",
    			options,
    			id: create_fragment$S.name
    		});
    	}

    	get height() {
    		throw new Error("<Outsourcing_2022>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Outsourcing_2022>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeMenu() {
    		throw new Error("<Outsourcing_2022>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeMenu(value) {
    		throw new Error("<Outsourcing_2022>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\DropdownMenus\Outsourcing_2023.svelte generated by Svelte v3.55.1 */

    // (34:4) <MenuItem on:click={() => {          activeMenu = "main"      }}  leftIcon={mdiArrowLeft} isChecked={false} >
    function create_default_slot_1$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Back");
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
    		id: create_default_slot_1$5.name,
    		type: "slot",
    		source: "(34:4) <MenuItem on:click={() => {          activeMenu = \\\"main\\\"      }}  leftIcon={mdiArrowLeft} isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (33:0) <MenuFrame bind:height={height} in_x={300} out_x={300}>
    function create_default_slot$w(ctx) {
    	let menuitem;
    	let current;

    	menuitem = new MenuItem({
    			props: {
    				leftIcon: mdiArrowLeft,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_1$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem.$on("click", /*click_handler*/ ctx[2]);

    	const block = {
    		c: function create() {
    			create_component(menuitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const menuitem_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				menuitem_changes.$$scope = { dirty, ctx };
    			}

    			menuitem.$set(menuitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$w.name,
    		type: "slot",
    		source: "(33:0) <MenuFrame bind:height={height} in_x={300} out_x={300}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$R(ctx) {
    	let menuframe;
    	let updating_height;
    	let current;

    	function menuframe_height_binding(value) {
    		/*menuframe_height_binding*/ ctx[3](value);
    	}

    	let menuframe_props = {
    		in_x: 300,
    		out_x: 300,
    		$$slots: { default: [create_default_slot$w] },
    		$$scope: { ctx }
    	};

    	if (/*height*/ ctx[0] !== void 0) {
    		menuframe_props.height = /*height*/ ctx[0];
    	}

    	menuframe = new DefaultMenu({ props: menuframe_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuframe, 'height', menuframe_height_binding));

    	const block = {
    		c: function create() {
    			create_component(menuframe.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuframe, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const menuframe_changes = {};

    			if (dirty & /*$$scope, activeMenu*/ 258) {
    				menuframe_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_height && dirty & /*height*/ 1) {
    				updating_height = true;
    				menuframe_changes.height = /*height*/ ctx[0];
    				add_flush_callback(() => updating_height = false);
    			}

    			menuframe.$set(menuframe_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuframe.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuframe.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuframe, detaching);
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

    function instance$R($$self, $$props, $$invalidate) {
    	let $LastPage;
    	validate_store(LastPage, 'LastPage');
    	component_subscribe($$self, LastPage, $$value => $$invalidate(5, $LastPage = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Outsourcing_2023', slots, []);
    	let { height } = $$props;
    	let { activeMenu } = $$props;
    	let isChecked = {};

    	function rerandering() {
    		for (var i in isChecked) isChecked[i] = false;
    		isChecked[$LastPage["Layer3"]] = true;
    	}

    	function pushRouter(link) {
    		link = link.toLowerCase();
    		var layers = link.split('/');

    		for (let i = 0; i < layers.length; i++) {
    			set_store_value(LastPage, $LastPage["Layer" + i.toString()] = layers[i], $LastPage);
    		}

    		push(link);
    	}

    	onMount(() => {
    		rerandering();
    	});

    	$$self.$$.on_mount.push(function () {
    		if (height === undefined && !('height' in $$props || $$self.$$.bound[$$self.$$.props['height']])) {
    			console.warn("<Outsourcing_2023> was created without expected prop 'height'");
    		}

    		if (activeMenu === undefined && !('activeMenu' in $$props || $$self.$$.bound[$$self.$$.props['activeMenu']])) {
    			console.warn("<Outsourcing_2023> was created without expected prop 'activeMenu'");
    		}
    	});

    	const writable_props = ['height', 'activeMenu'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Outsourcing_2023> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(1, activeMenu = "main");
    	};

    	function menuframe_height_binding(value) {
    		height = value;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    	};

    	$$self.$capture_state = () => ({
    		LastPage,
    		season,
    		mdiArrowLeft,
    		mdiCalendarMonthOutline,
    		mdiChevronRight,
    		MenuItem,
    		MenuFrame: DefaultMenu,
    		push,
    		onMount,
    		height,
    		activeMenu,
    		isChecked,
    		rerandering,
    		pushRouter,
    		$LastPage
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    		if ('isChecked' in $$props) isChecked = $$props.isChecked;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [height, activeMenu, click_handler, menuframe_height_binding];
    }

    class Outsourcing_2023 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$R, create_fragment$R, safe_not_equal, { height: 0, activeMenu: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Outsourcing_2023",
    			options,
    			id: create_fragment$R.name
    		});
    	}

    	get height() {
    		throw new Error("<Outsourcing_2023>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Outsourcing_2023>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeMenu() {
    		throw new Error("<Outsourcing_2023>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeMenu(value) {
    		throw new Error("<Outsourcing_2023>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\NavOutsourcingSelector.svelte generated by Svelte v3.55.1 */
    const file$L = "src\\component\\NavOutsourcingSelector.svelte";

    // (34:0) <NavItem bind:open={isOpen} isMobile={ $Device["isMobile"] }>
    function create_default_slot$v(ctx) {
    	let dropdownmenu;
    	let current;

    	dropdownmenu = new DropdownMenu({
    			props: {
    				Menu: [
    					{ Name: 'main', Component: Outsourcing_Main },
    					{
    						Name: '2022',
    						Component: Outsourcing_2022
    					},
    					{
    						Name: '2023',
    						Component: Outsourcing_2023
    					}
    				]
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
    		p: noop,
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
    		id: create_default_slot$v.name,
    		type: "slot",
    		source: "(34:0) <NavItem bind:open={isOpen} isMobile={ $Device[\\\"isMobile\\\"] }>",
    		ctx
    	});

    	return block;
    }

    // (35:4) 
    function create_trigger_slot$2(ctx) {
    	let span;
    	let iconbutton;
    	let updating_showComment;
    	let current;
    	let mounted;
    	let dispose;

    	function iconbutton_showComment_binding(value) {
    		/*iconbutton_showComment_binding*/ ctx[4](value);
    	}

    	let iconbutton_props = {
    		path: mdiCurrencyKrw,
    		Comment: "Outsourcing"
    	};

    	if (/*isOpen*/ ctx[0] !== void 0) {
    		iconbutton_props.showComment = /*isOpen*/ ctx[0];
    	}

    	iconbutton = new IconButton({ props: iconbutton_props, $$inline: true });
    	binding_callbacks.push(() => bind(iconbutton, 'showComment', iconbutton_showComment_binding));

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(iconbutton.$$.fragment);
    			attr_dev(span, "slot", "trigger");
    			add_location(span, file$L, 34, 4, 1152);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(iconbutton, span, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(span, "click", /*click_handler*/ ctx[5], false, false, false),
    					listen_dev(span, "keypress", empty$1, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const iconbutton_changes = {};

    			if (!updating_showComment && dirty & /*isOpen*/ 1) {
    				updating_showComment = true;
    				iconbutton_changes.showComment = /*isOpen*/ ctx[0];
    				add_flush_callback(() => updating_showComment = false);
    			}

    			iconbutton.$set(iconbutton_changes);
    		},
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
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_trigger_slot$2.name,
    		type: "slot",
    		source: "(35:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$Q(ctx) {
    	let div;
    	let navitem;
    	let updating_open;
    	let div_intro;
    	let current;

    	function navitem_open_binding(value) {
    		/*navitem_open_binding*/ ctx[6](value);
    	}

    	let navitem_props = {
    		isMobile: /*$Device*/ ctx[3]["isMobile"],
    		$$slots: {
    			trigger: [create_trigger_slot$2],
    			default: [create_default_slot$v]
    		},
    		$$scope: { ctx }
    	};

    	if (/*isOpen*/ ctx[0] !== void 0) {
    		navitem_props.open = /*isOpen*/ ctx[0];
    	}

    	navitem = new NavItem({ props: navitem_props, $$inline: true });
    	binding_callbacks.push(() => bind(navitem, 'open', navitem_open_binding));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navitem.$$.fragment);
    			attr_dev(div, "class", "OutsourcingSelector svelte-e6i4y1");
    			set_style(div, "height", /*height*/ ctx[1] + "px");
    			add_location(div, file$L, 32, 0, 996);
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
    			if (dirty & /*$Device*/ 8) navitem_changes.isMobile = /*$Device*/ ctx[3]["isMobile"];

    			if (dirty & /*$$scope, pushFunc, isOpen*/ 2053) {
    				navitem_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*isOpen*/ 1) {
    				updating_open = true;
    				navitem_changes.open = /*isOpen*/ ctx[0];
    				add_flush_callback(() => updating_open = false);
    			}

    			navitem.$set(navitem_changes);

    			if (!current || dirty & /*height*/ 2) {
    				set_style(div, "height", /*height*/ ctx[1] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navitem.$$.fragment, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, { delay: 100 });
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
    		id: create_fragment$Q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function empty$1() {
    	
    }

    function instance$Q($$self, $$props, $$invalidate) {
    	let $LastPage;
    	let $ContextVisible;
    	let $Device;
    	validate_store(LastPage, 'LastPage');
    	component_subscribe($$self, LastPage, $$value => $$invalidate(7, $LastPage = $$value));
    	validate_store(ContextVisible, 'ContextVisible');
    	component_subscribe($$self, ContextVisible, $$value => $$invalidate(8, $ContextVisible = $$value));
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(3, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavOutsourcingSelector', slots, []);
    	let SwitchStatus = $ContextVisible;
    	let width = 0;
    	let { height = 0 } = $$props;
    	let { isOpen = false } = $$props;
    	let { pushFunc } = $$props;

    	onMount(() => {
    		if ($LastPage["Layer1"] == 'outsourcing') ;
    	});

    	$$self.$$.on_mount.push(function () {
    		if (pushFunc === undefined && !('pushFunc' in $$props || $$self.$$.bound[$$self.$$.props['pushFunc']])) {
    			console.warn("<NavOutsourcingSelector> was created without expected prop 'pushFunc'");
    		}
    	});

    	const writable_props = ['height', 'isOpen', 'pushFunc'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavOutsourcingSelector> was created with unknown prop '${key}'`);
    	});

    	function iconbutton_showComment_binding(value) {
    		isOpen = value;
    		$$invalidate(0, isOpen);
    	}

    	const click_handler = event => pushFunc("/outsourcing");

    	function navitem_open_binding(value) {
    		isOpen = value;
    		$$invalidate(0, isOpen);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$props.isOpen);
    		if ('pushFunc' in $$props) $$invalidate(2, pushFunc = $$props.pushFunc);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		Device,
    		ContextVisible,
    		LastPage,
    		mdiCurrencyKrw,
    		mdiCalendarMonthOutline,
    		NavItem,
    		DropdownMenu,
    		IconButton,
    		MenuItem,
    		onMount,
    		OutsourcingMain: Outsourcing_Main,
    		Outsourcing_2022,
    		Outsourcing_2023,
    		SwitchStatus,
    		width,
    		height,
    		isOpen,
    		pushFunc,
    		empty: empty$1,
    		$LastPage,
    		$ContextVisible,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('SwitchStatus' in $$props) SwitchStatus = $$props.SwitchStatus;
    		if ('width' in $$props) width = $$props.width;
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$props.isOpen);
    		if ('pushFunc' in $$props) $$invalidate(2, pushFunc = $$props.pushFunc);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isOpen,
    		height,
    		pushFunc,
    		$Device,
    		iconbutton_showComment_binding,
    		click_handler,
    		navitem_open_binding
    	];
    }

    class NavOutsourcingSelector extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$Q, create_fragment$Q, safe_not_equal, { height: 1, isOpen: 0, pushFunc: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavOutsourcingSelector",
    			options,
    			id: create_fragment$Q.name
    		});
    	}

    	get height() {
    		throw new Error("<NavOutsourcingSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<NavOutsourcingSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		throw new Error("<NavOutsourcingSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error("<NavOutsourcingSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pushFunc() {
    		throw new Error("<NavOutsourcingSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pushFunc(value) {
    		throw new Error("<NavOutsourcingSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\DropdownMenus\Projects_Main.svelte generated by Svelte v3.55.1 */

    // (13:4) <MenuItem on:click={() => {          activeMenu = "2021"      }}  leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >
    function create_default_slot_3$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("2021");
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
    		id: create_default_slot_3$4.name,
    		type: "slot",
    		source: "(13:4) <MenuItem on:click={() => {          activeMenu = \\\"2021\\\"      }}  leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (16:4) <MenuItem on:click={() => {          activeMenu = "2022"      }}  leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >
    function create_default_slot_2$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("2022");
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
    		id: create_default_slot_2$4.name,
    		type: "slot",
    		source: "(16:4) <MenuItem on:click={() => {          activeMenu = \\\"2022\\\"      }}  leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (19:4) <MenuItem on:click={() => {          activeMenu = "2023"      }}   leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >
    function create_default_slot_1$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("2023");
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
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(19:4) <MenuItem on:click={() => {          activeMenu = \\\"2023\\\"      }}   leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (12:0) <MenuFrame bind:height={height}>
    function create_default_slot$u(ctx) {
    	let menuitem0;
    	let t0;
    	let menuitem1;
    	let t1;
    	let menuitem2;
    	let current;

    	menuitem0 = new MenuItem({
    			props: {
    				leftIcon: mdiCalendarMonthOutline,
    				rightIcon: mdiChevronRight,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_3$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem0.$on("click", /*click_handler*/ ctx[2]);

    	menuitem1 = new MenuItem({
    			props: {
    				leftIcon: mdiCalendarMonthOutline,
    				rightIcon: mdiChevronRight,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_2$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem1.$on("click", /*click_handler_1*/ ctx[3]);

    	menuitem2 = new MenuItem({
    			props: {
    				leftIcon: mdiCalendarMonthOutline,
    				rightIcon: mdiChevronRight,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem2.$on("click", /*click_handler_2*/ ctx[4]);

    	const block = {
    		c: function create() {
    			create_component(menuitem0.$$.fragment);
    			t0 = space();
    			create_component(menuitem1.$$.fragment);
    			t1 = space();
    			create_component(menuitem2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuitem0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(menuitem1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(menuitem2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const menuitem0_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				menuitem0_changes.$$scope = { dirty, ctx };
    			}

    			menuitem0.$set(menuitem0_changes);
    			const menuitem1_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				menuitem1_changes.$$scope = { dirty, ctx };
    			}

    			menuitem1.$set(menuitem1_changes);
    			const menuitem2_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				menuitem2_changes.$$scope = { dirty, ctx };
    			}

    			menuitem2.$set(menuitem2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuitem0.$$.fragment, local);
    			transition_in(menuitem1.$$.fragment, local);
    			transition_in(menuitem2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuitem0.$$.fragment, local);
    			transition_out(menuitem1.$$.fragment, local);
    			transition_out(menuitem2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuitem0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(menuitem1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(menuitem2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$u.name,
    		type: "slot",
    		source: "(12:0) <MenuFrame bind:height={height}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$P(ctx) {
    	let menuframe;
    	let updating_height;
    	let current;

    	function menuframe_height_binding(value) {
    		/*menuframe_height_binding*/ ctx[5](value);
    	}

    	let menuframe_props = {
    		$$slots: { default: [create_default_slot$u] },
    		$$scope: { ctx }
    	};

    	if (/*height*/ ctx[0] !== void 0) {
    		menuframe_props.height = /*height*/ ctx[0];
    	}

    	menuframe = new DefaultMenu({ props: menuframe_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuframe, 'height', menuframe_height_binding));

    	const block = {
    		c: function create() {
    			create_component(menuframe.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuframe, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const menuframe_changes = {};

    			if (dirty & /*$$scope, activeMenu*/ 66) {
    				menuframe_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_height && dirty & /*height*/ 1) {
    				updating_height = true;
    				menuframe_changes.height = /*height*/ ctx[0];
    				add_flush_callback(() => updating_height = false);
    			}

    			menuframe.$set(menuframe_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuframe.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuframe.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuframe, detaching);
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

    function instance$P($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects_Main', slots, []);
    	let { height } = $$props;
    	let { activeMenu } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (height === undefined && !('height' in $$props || $$self.$$.bound[$$self.$$.props['height']])) {
    			console.warn("<Projects_Main> was created without expected prop 'height'");
    		}

    		if (activeMenu === undefined && !('activeMenu' in $$props || $$self.$$.bound[$$self.$$.props['activeMenu']])) {
    			console.warn("<Projects_Main> was created without expected prop 'activeMenu'");
    		}
    	});

    	const writable_props = ['height', 'activeMenu'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects_Main> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(1, activeMenu = "2021");
    	};

    	const click_handler_1 = () => {
    		$$invalidate(1, activeMenu = "2022");
    	};

    	const click_handler_2 = () => {
    		$$invalidate(1, activeMenu = "2023");
    	};

    	function menuframe_height_binding(value) {
    		height = value;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    	};

    	$$self.$capture_state = () => ({
    		season,
    		mdiCalendarMonthOutline,
    		mdiChevronRight,
    		MenuItem,
    		MenuFrame: DefaultMenu,
    		onMount,
    		height,
    		activeMenu
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		height,
    		activeMenu,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		menuframe_height_binding
    	];
    }

    class Projects_Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$P, create_fragment$P, safe_not_equal, { height: 0, activeMenu: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects_Main",
    			options,
    			id: create_fragment$P.name
    		});
    	}

    	get height() {
    		throw new Error("<Projects_Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Projects_Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeMenu() {
    		throw new Error("<Projects_Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeMenu(value) {
    		throw new Error("<Projects_Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\DropdownMenus\Projects_2021.svelte generated by Svelte v3.55.1 */

    // (34:4) <MenuItem on:click={() => {          activeMenu = "main"      }}  leftIcon={mdiArrowLeft} isChecked={false} >
    function create_default_slot_6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Back");
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
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(34:4) <MenuItem on:click={() => {          activeMenu = \\\"main\\\"      }}  leftIcon={mdiArrowLeft} isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (37:4) <MenuItem on:click={() => {          pushRouter("/project/2021/downloader")          rerandering();      }}  leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["downloader"]} >
    function create_default_slot_5$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("다운로더 / 인스펙터");
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
    		source: "(37:4) <MenuItem on:click={() => {          pushRouter(\\\"/project/2021/downloader\\\")          rerandering();      }}  leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked[\\\"downloader\\\"]} >",
    		ctx
    	});

    	return block;
    }

    // (41:4) <MenuItem on:click={() => {          pushRouter("/project/2021/cafe24")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["cafe24"]}>
    function create_default_slot_4$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Cafe24 리뉴얼");
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
    		source: "(41:4) <MenuItem on:click={() => {          pushRouter(\\\"/project/2021/cafe24\\\")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked[\\\"cafe24\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (45:4) <MenuItem on:click={() => {          pushRouter("/project/2021/convyervision")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["convyervision"]}>
    function create_default_slot_3$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Convyer Vision");
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
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(45:4) <MenuItem on:click={() => {          pushRouter(\\\"/project/2021/convyervision\\\")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked[\\\"convyervision\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (49:4) <MenuItem on:click={() => {          pushRouter("/project/2021/robotpiano")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["robotpiano"]}>
    function create_default_slot_2$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Robot Piano");
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
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(49:4) <MenuItem on:click={() => {          pushRouter(\\\"/project/2021/robotpiano\\\")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked[\\\"robotpiano\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (53:4) <MenuItem on:click={() => {          pushRouter("/project/2021/barcode")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["barcode"]}>
    function create_default_slot_1$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("바코드 리더");
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
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(53:4) <MenuItem on:click={() => {          pushRouter(\\\"/project/2021/barcode\\\")          rerandering();      }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked[\\\"barcode\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (33:0) <MenuFrame bind:height={height} in_x={300} out_x={300}>
    function create_default_slot$t(ctx) {
    	let menuitem0;
    	let t0;
    	let menuitem1;
    	let updating_isChecked;
    	let t1;
    	let menuitem2;
    	let updating_isChecked_1;
    	let t2;
    	let menuitem3;
    	let updating_isChecked_2;
    	let t3;
    	let menuitem4;
    	let updating_isChecked_3;
    	let t4;
    	let menuitem5;
    	let updating_isChecked_4;
    	let current;

    	menuitem0 = new MenuItem({
    			props: {
    				leftIcon: mdiArrowLeft,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem0.$on("click", /*click_handler*/ ctx[5]);

    	function menuitem1_isChecked_binding(value) {
    		/*menuitem1_isChecked_binding*/ ctx[6](value);
    	}

    	let menuitem1_props = {
    		leftIcon: mdiCalendarMonthOutline,
    		$$slots: { default: [create_default_slot_5$1] },
    		$$scope: { ctx }
    	};

    	if (/*isChecked*/ ctx[2]["downloader"] !== void 0) {
    		menuitem1_props.isChecked = /*isChecked*/ ctx[2]["downloader"];
    	}

    	menuitem1 = new MenuItem({ props: menuitem1_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuitem1, 'isChecked', menuitem1_isChecked_binding));
    	menuitem1.$on("click", /*click_handler_1*/ ctx[7]);

    	function menuitem2_isChecked_binding(value) {
    		/*menuitem2_isChecked_binding*/ ctx[8](value);
    	}

    	let menuitem2_props = {
    		leftIcon: mdiCalendarMonthOutline,
    		$$slots: { default: [create_default_slot_4$1] },
    		$$scope: { ctx }
    	};

    	if (/*isChecked*/ ctx[2]["cafe24"] !== void 0) {
    		menuitem2_props.isChecked = /*isChecked*/ ctx[2]["cafe24"];
    	}

    	menuitem2 = new MenuItem({ props: menuitem2_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuitem2, 'isChecked', menuitem2_isChecked_binding));
    	menuitem2.$on("click", /*click_handler_2*/ ctx[9]);

    	function menuitem3_isChecked_binding(value) {
    		/*menuitem3_isChecked_binding*/ ctx[10](value);
    	}

    	let menuitem3_props = {
    		leftIcon: mdiCalendarMonthOutline,
    		$$slots: { default: [create_default_slot_3$3] },
    		$$scope: { ctx }
    	};

    	if (/*isChecked*/ ctx[2]["convyervision"] !== void 0) {
    		menuitem3_props.isChecked = /*isChecked*/ ctx[2]["convyervision"];
    	}

    	menuitem3 = new MenuItem({ props: menuitem3_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuitem3, 'isChecked', menuitem3_isChecked_binding));
    	menuitem3.$on("click", /*click_handler_3*/ ctx[11]);

    	function menuitem4_isChecked_binding(value) {
    		/*menuitem4_isChecked_binding*/ ctx[12](value);
    	}

    	let menuitem4_props = {
    		leftIcon: mdiCalendarMonthOutline,
    		$$slots: { default: [create_default_slot_2$3] },
    		$$scope: { ctx }
    	};

    	if (/*isChecked*/ ctx[2]["robotpiano"] !== void 0) {
    		menuitem4_props.isChecked = /*isChecked*/ ctx[2]["robotpiano"];
    	}

    	menuitem4 = new MenuItem({ props: menuitem4_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuitem4, 'isChecked', menuitem4_isChecked_binding));
    	menuitem4.$on("click", /*click_handler_4*/ ctx[13]);

    	function menuitem5_isChecked_binding(value) {
    		/*menuitem5_isChecked_binding*/ ctx[14](value);
    	}

    	let menuitem5_props = {
    		leftIcon: mdiCalendarMonthOutline,
    		$$slots: { default: [create_default_slot_1$3] },
    		$$scope: { ctx }
    	};

    	if (/*isChecked*/ ctx[2]["barcode"] !== void 0) {
    		menuitem5_props.isChecked = /*isChecked*/ ctx[2]["barcode"];
    	}

    	menuitem5 = new MenuItem({ props: menuitem5_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuitem5, 'isChecked', menuitem5_isChecked_binding));
    	menuitem5.$on("click", /*click_handler_5*/ ctx[15]);

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
    			t4 = space();
    			create_component(menuitem5.$$.fragment);
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
    			insert_dev(target, t4, anchor);
    			mount_component(menuitem5, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const menuitem0_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				menuitem0_changes.$$scope = { dirty, ctx };
    			}

    			menuitem0.$set(menuitem0_changes);
    			const menuitem1_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				menuitem1_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_isChecked && dirty & /*isChecked*/ 4) {
    				updating_isChecked = true;
    				menuitem1_changes.isChecked = /*isChecked*/ ctx[2]["downloader"];
    				add_flush_callback(() => updating_isChecked = false);
    			}

    			menuitem1.$set(menuitem1_changes);
    			const menuitem2_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				menuitem2_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_isChecked_1 && dirty & /*isChecked*/ 4) {
    				updating_isChecked_1 = true;
    				menuitem2_changes.isChecked = /*isChecked*/ ctx[2]["cafe24"];
    				add_flush_callback(() => updating_isChecked_1 = false);
    			}

    			menuitem2.$set(menuitem2_changes);
    			const menuitem3_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				menuitem3_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_isChecked_2 && dirty & /*isChecked*/ 4) {
    				updating_isChecked_2 = true;
    				menuitem3_changes.isChecked = /*isChecked*/ ctx[2]["convyervision"];
    				add_flush_callback(() => updating_isChecked_2 = false);
    			}

    			menuitem3.$set(menuitem3_changes);
    			const menuitem4_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				menuitem4_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_isChecked_3 && dirty & /*isChecked*/ 4) {
    				updating_isChecked_3 = true;
    				menuitem4_changes.isChecked = /*isChecked*/ ctx[2]["robotpiano"];
    				add_flush_callback(() => updating_isChecked_3 = false);
    			}

    			menuitem4.$set(menuitem4_changes);
    			const menuitem5_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				menuitem5_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_isChecked_4 && dirty & /*isChecked*/ 4) {
    				updating_isChecked_4 = true;
    				menuitem5_changes.isChecked = /*isChecked*/ ctx[2]["barcode"];
    				add_flush_callback(() => updating_isChecked_4 = false);
    			}

    			menuitem5.$set(menuitem5_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuitem0.$$.fragment, local);
    			transition_in(menuitem1.$$.fragment, local);
    			transition_in(menuitem2.$$.fragment, local);
    			transition_in(menuitem3.$$.fragment, local);
    			transition_in(menuitem4.$$.fragment, local);
    			transition_in(menuitem5.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuitem0.$$.fragment, local);
    			transition_out(menuitem1.$$.fragment, local);
    			transition_out(menuitem2.$$.fragment, local);
    			transition_out(menuitem3.$$.fragment, local);
    			transition_out(menuitem4.$$.fragment, local);
    			transition_out(menuitem5.$$.fragment, local);
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
    			if (detaching) detach_dev(t4);
    			destroy_component(menuitem5, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$t.name,
    		type: "slot",
    		source: "(33:0) <MenuFrame bind:height={height} in_x={300} out_x={300}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$O(ctx) {
    	let menuframe;
    	let updating_height;
    	let current;

    	function menuframe_height_binding(value) {
    		/*menuframe_height_binding*/ ctx[16](value);
    	}

    	let menuframe_props = {
    		in_x: 300,
    		out_x: 300,
    		$$slots: { default: [create_default_slot$t] },
    		$$scope: { ctx }
    	};

    	if (/*height*/ ctx[0] !== void 0) {
    		menuframe_props.height = /*height*/ ctx[0];
    	}

    	menuframe = new DefaultMenu({ props: menuframe_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuframe, 'height', menuframe_height_binding));

    	const block = {
    		c: function create() {
    			create_component(menuframe.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuframe, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const menuframe_changes = {};

    			if (dirty & /*$$scope, isChecked, activeMenu*/ 262150) {
    				menuframe_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_height && dirty & /*height*/ 1) {
    				updating_height = true;
    				menuframe_changes.height = /*height*/ ctx[0];
    				add_flush_callback(() => updating_height = false);
    			}

    			menuframe.$set(menuframe_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuframe.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuframe.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuframe, detaching);
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
    	let $LastPage;
    	validate_store(LastPage, 'LastPage');
    	component_subscribe($$self, LastPage, $$value => $$invalidate(17, $LastPage = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects_2021', slots, []);
    	let { height } = $$props;
    	let { activeMenu } = $$props;
    	let isChecked = {};

    	function rerandering() {
    		for (var i in isChecked) $$invalidate(2, isChecked[i] = false, isChecked);
    		$$invalidate(2, isChecked[$LastPage["Layer3"]] = true, isChecked);
    	}

    	function pushRouter(link) {
    		link = link.toLowerCase();
    		var layers = link.split('/');

    		for (let i = 0; i < layers.length; i++) {
    			set_store_value(LastPage, $LastPage["Layer" + i.toString()] = layers[i], $LastPage);
    		}

    		push(link);
    	}

    	onMount(() => {
    		rerandering();
    	});

    	$$self.$$.on_mount.push(function () {
    		if (height === undefined && !('height' in $$props || $$self.$$.bound[$$self.$$.props['height']])) {
    			console.warn("<Projects_2021> was created without expected prop 'height'");
    		}

    		if (activeMenu === undefined && !('activeMenu' in $$props || $$self.$$.bound[$$self.$$.props['activeMenu']])) {
    			console.warn("<Projects_2021> was created without expected prop 'activeMenu'");
    		}
    	});

    	const writable_props = ['height', 'activeMenu'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects_2021> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(1, activeMenu = "main");
    	};

    	function menuitem1_isChecked_binding(value) {
    		if ($$self.$$.not_equal(isChecked["downloader"], value)) {
    			isChecked["downloader"] = value;
    			$$invalidate(2, isChecked);
    		}
    	}

    	const click_handler_1 = () => {
    		pushRouter("/project/2021/downloader");
    		rerandering();
    	};

    	function menuitem2_isChecked_binding(value) {
    		if ($$self.$$.not_equal(isChecked["cafe24"], value)) {
    			isChecked["cafe24"] = value;
    			$$invalidate(2, isChecked);
    		}
    	}

    	const click_handler_2 = () => {
    		pushRouter("/project/2021/cafe24");
    		rerandering();
    	};

    	function menuitem3_isChecked_binding(value) {
    		if ($$self.$$.not_equal(isChecked["convyervision"], value)) {
    			isChecked["convyervision"] = value;
    			$$invalidate(2, isChecked);
    		}
    	}

    	const click_handler_3 = () => {
    		pushRouter("/project/2021/convyervision");
    		rerandering();
    	};

    	function menuitem4_isChecked_binding(value) {
    		if ($$self.$$.not_equal(isChecked["robotpiano"], value)) {
    			isChecked["robotpiano"] = value;
    			$$invalidate(2, isChecked);
    		}
    	}

    	const click_handler_4 = () => {
    		pushRouter("/project/2021/robotpiano");
    		rerandering();
    	};

    	function menuitem5_isChecked_binding(value) {
    		if ($$self.$$.not_equal(isChecked["barcode"], value)) {
    			isChecked["barcode"] = value;
    			$$invalidate(2, isChecked);
    		}
    	}

    	const click_handler_5 = () => {
    		pushRouter("/project/2021/barcode");
    		rerandering();
    	};

    	function menuframe_height_binding(value) {
    		height = value;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    	};

    	$$self.$capture_state = () => ({
    		LastPage,
    		season,
    		mdiArrowLeft,
    		mdiCalendarMonthOutline,
    		MenuItem,
    		MenuFrame: DefaultMenu,
    		push,
    		onMount,
    		height,
    		activeMenu,
    		isChecked,
    		rerandering,
    		pushRouter,
    		$LastPage
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    		if ('isChecked' in $$props) $$invalidate(2, isChecked = $$props.isChecked);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		height,
    		activeMenu,
    		isChecked,
    		rerandering,
    		pushRouter,
    		click_handler,
    		menuitem1_isChecked_binding,
    		click_handler_1,
    		menuitem2_isChecked_binding,
    		click_handler_2,
    		menuitem3_isChecked_binding,
    		click_handler_3,
    		menuitem4_isChecked_binding,
    		click_handler_4,
    		menuitem5_isChecked_binding,
    		click_handler_5,
    		menuframe_height_binding
    	];
    }

    class Projects_2021 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$O, create_fragment$O, safe_not_equal, { height: 0, activeMenu: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects_2021",
    			options,
    			id: create_fragment$O.name
    		});
    	}

    	get height() {
    		throw new Error("<Projects_2021>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Projects_2021>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeMenu() {
    		throw new Error("<Projects_2021>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeMenu(value) {
    		throw new Error("<Projects_2021>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\DropdownMenus\Projects_2022.svelte generated by Svelte v3.55.1 */

    // (13:4) <MenuItem on:click={() => {          activeMenu = "main"      }}  leftIcon={mdiArrowLeft} isChecked={false} >
    function create_default_slot_3$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Back");
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
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(13:4) <MenuItem on:click={() => {          activeMenu = \\\"main\\\"      }}  leftIcon={mdiArrowLeft} isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (16:4) <MenuItem on:click={() => {      }}  leftIcon={mdiCalendarMonthOutline} isChecked={false} >
    function create_default_slot_2$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("A");
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
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(16:4) <MenuItem on:click={() => {      }}  leftIcon={mdiCalendarMonthOutline} isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (18:4) <MenuItem on:click={() => {      }}   leftIcon={mdiCalendarMonthOutline} isChecked={false} >
    function create_default_slot_1$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("B");
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
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(18:4) <MenuItem on:click={() => {      }}   leftIcon={mdiCalendarMonthOutline} isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (12:0) <MenuFrame bind:height={height} in_x={300} out_x={300}>
    function create_default_slot$s(ctx) {
    	let menuitem0;
    	let t0;
    	let menuitem1;
    	let t1;
    	let menuitem2;
    	let current;

    	menuitem0 = new MenuItem({
    			props: {
    				leftIcon: mdiArrowLeft,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem0.$on("click", /*click_handler*/ ctx[2]);

    	menuitem1 = new MenuItem({
    			props: {
    				leftIcon: mdiCalendarMonthOutline,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem1.$on("click", click_handler_1$1);

    	menuitem2 = new MenuItem({
    			props: {
    				leftIcon: mdiCalendarMonthOutline,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem2.$on("click", click_handler_2$1);

    	const block = {
    		c: function create() {
    			create_component(menuitem0.$$.fragment);
    			t0 = space();
    			create_component(menuitem1.$$.fragment);
    			t1 = space();
    			create_component(menuitem2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuitem0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(menuitem1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(menuitem2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const menuitem0_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				menuitem0_changes.$$scope = { dirty, ctx };
    			}

    			menuitem0.$set(menuitem0_changes);
    			const menuitem1_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				menuitem1_changes.$$scope = { dirty, ctx };
    			}

    			menuitem1.$set(menuitem1_changes);
    			const menuitem2_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				menuitem2_changes.$$scope = { dirty, ctx };
    			}

    			menuitem2.$set(menuitem2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuitem0.$$.fragment, local);
    			transition_in(menuitem1.$$.fragment, local);
    			transition_in(menuitem2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuitem0.$$.fragment, local);
    			transition_out(menuitem1.$$.fragment, local);
    			transition_out(menuitem2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuitem0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(menuitem1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(menuitem2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$s.name,
    		type: "slot",
    		source: "(12:0) <MenuFrame bind:height={height} in_x={300} out_x={300}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$N(ctx) {
    	let menuframe;
    	let updating_height;
    	let current;

    	function menuframe_height_binding(value) {
    		/*menuframe_height_binding*/ ctx[3](value);
    	}

    	let menuframe_props = {
    		in_x: 300,
    		out_x: 300,
    		$$slots: { default: [create_default_slot$s] },
    		$$scope: { ctx }
    	};

    	if (/*height*/ ctx[0] !== void 0) {
    		menuframe_props.height = /*height*/ ctx[0];
    	}

    	menuframe = new DefaultMenu({ props: menuframe_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuframe, 'height', menuframe_height_binding));

    	const block = {
    		c: function create() {
    			create_component(menuframe.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuframe, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const menuframe_changes = {};

    			if (dirty & /*$$scope, activeMenu*/ 18) {
    				menuframe_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_height && dirty & /*height*/ 1) {
    				updating_height = true;
    				menuframe_changes.height = /*height*/ ctx[0];
    				add_flush_callback(() => updating_height = false);
    			}

    			menuframe.$set(menuframe_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuframe.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuframe.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuframe, detaching);
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

    const click_handler_1$1 = () => {
    	
    };

    const click_handler_2$1 = () => {
    	
    };

    function instance$N($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects_2022', slots, []);
    	let { height } = $$props;
    	let { activeMenu } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (height === undefined && !('height' in $$props || $$self.$$.bound[$$self.$$.props['height']])) {
    			console.warn("<Projects_2022> was created without expected prop 'height'");
    		}

    		if (activeMenu === undefined && !('activeMenu' in $$props || $$self.$$.bound[$$self.$$.props['activeMenu']])) {
    			console.warn("<Projects_2022> was created without expected prop 'activeMenu'");
    		}
    	});

    	const writable_props = ['height', 'activeMenu'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects_2022> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(1, activeMenu = "main");
    	};

    	function menuframe_height_binding(value) {
    		height = value;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    	};

    	$$self.$capture_state = () => ({
    		season,
    		mdiArrowLeft,
    		mdiCalendarMonthOutline,
    		mdiChevronRight,
    		MenuItem,
    		MenuFrame: DefaultMenu,
    		onMount,
    		height,
    		activeMenu
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [height, activeMenu, click_handler, menuframe_height_binding];
    }

    class Projects_2022 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$N, create_fragment$N, safe_not_equal, { height: 0, activeMenu: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects_2022",
    			options,
    			id: create_fragment$N.name
    		});
    	}

    	get height() {
    		throw new Error("<Projects_2022>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Projects_2022>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeMenu() {
    		throw new Error("<Projects_2022>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeMenu(value) {
    		throw new Error("<Projects_2022>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\DropdownMenus\Projects_2023.svelte generated by Svelte v3.55.1 */

    // (13:4) <MenuItem on:click={() => {          activeMenu = "main"      }}  leftIcon={mdiArrowLeft} isChecked={false} >
    function create_default_slot_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Back");
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
    		source: "(13:4) <MenuItem on:click={() => {          activeMenu = \\\"main\\\"      }}  leftIcon={mdiArrowLeft} isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (16:4) <MenuItem on:click={() => {      }}  leftIcon={mdiCalendarMonthOutline} isChecked={false} >
    function create_default_slot_2$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("A");
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
    		source: "(16:4) <MenuItem on:click={() => {      }}  leftIcon={mdiCalendarMonthOutline} isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (18:4) <MenuItem on:click={() => {      }}   leftIcon={mdiCalendarMonthOutline} isChecked={false} >
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("B");
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
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(18:4) <MenuItem on:click={() => {      }}   leftIcon={mdiCalendarMonthOutline} isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (12:0) <MenuFrame bind:height={height} in_x={300} out_x={300}>
    function create_default_slot$r(ctx) {
    	let menuitem0;
    	let t0;
    	let menuitem1;
    	let t1;
    	let menuitem2;
    	let current;

    	menuitem0 = new MenuItem({
    			props: {
    				leftIcon: mdiArrowLeft,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem0.$on("click", /*click_handler*/ ctx[2]);

    	menuitem1 = new MenuItem({
    			props: {
    				leftIcon: mdiCalendarMonthOutline,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem1.$on("click", click_handler_1);

    	menuitem2 = new MenuItem({
    			props: {
    				leftIcon: mdiCalendarMonthOutline,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem2.$on("click", click_handler_2);

    	const block = {
    		c: function create() {
    			create_component(menuitem0.$$.fragment);
    			t0 = space();
    			create_component(menuitem1.$$.fragment);
    			t1 = space();
    			create_component(menuitem2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuitem0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(menuitem1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(menuitem2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const menuitem0_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				menuitem0_changes.$$scope = { dirty, ctx };
    			}

    			menuitem0.$set(menuitem0_changes);
    			const menuitem1_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				menuitem1_changes.$$scope = { dirty, ctx };
    			}

    			menuitem1.$set(menuitem1_changes);
    			const menuitem2_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				menuitem2_changes.$$scope = { dirty, ctx };
    			}

    			menuitem2.$set(menuitem2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuitem0.$$.fragment, local);
    			transition_in(menuitem1.$$.fragment, local);
    			transition_in(menuitem2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuitem0.$$.fragment, local);
    			transition_out(menuitem1.$$.fragment, local);
    			transition_out(menuitem2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuitem0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(menuitem1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(menuitem2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$r.name,
    		type: "slot",
    		source: "(12:0) <MenuFrame bind:height={height} in_x={300} out_x={300}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$M(ctx) {
    	let menuframe;
    	let updating_height;
    	let current;

    	function menuframe_height_binding(value) {
    		/*menuframe_height_binding*/ ctx[3](value);
    	}

    	let menuframe_props = {
    		in_x: 300,
    		out_x: 300,
    		$$slots: { default: [create_default_slot$r] },
    		$$scope: { ctx }
    	};

    	if (/*height*/ ctx[0] !== void 0) {
    		menuframe_props.height = /*height*/ ctx[0];
    	}

    	menuframe = new DefaultMenu({ props: menuframe_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuframe, 'height', menuframe_height_binding));

    	const block = {
    		c: function create() {
    			create_component(menuframe.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuframe, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const menuframe_changes = {};

    			if (dirty & /*$$scope, activeMenu*/ 18) {
    				menuframe_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_height && dirty & /*height*/ 1) {
    				updating_height = true;
    				menuframe_changes.height = /*height*/ ctx[0];
    				add_flush_callback(() => updating_height = false);
    			}

    			menuframe.$set(menuframe_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuframe.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuframe.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuframe, detaching);
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

    const click_handler_1 = () => {
    	
    };

    const click_handler_2 = () => {
    	
    };

    function instance$M($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects_2023', slots, []);
    	let { height } = $$props;
    	let { activeMenu } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (height === undefined && !('height' in $$props || $$self.$$.bound[$$self.$$.props['height']])) {
    			console.warn("<Projects_2023> was created without expected prop 'height'");
    		}

    		if (activeMenu === undefined && !('activeMenu' in $$props || $$self.$$.bound[$$self.$$.props['activeMenu']])) {
    			console.warn("<Projects_2023> was created without expected prop 'activeMenu'");
    		}
    	});

    	const writable_props = ['height', 'activeMenu'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects_2023> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(1, activeMenu = "main");
    	};

    	function menuframe_height_binding(value) {
    		height = value;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    	};

    	$$self.$capture_state = () => ({
    		season,
    		mdiArrowLeft,
    		mdiCalendarMonthOutline,
    		mdiChevronRight,
    		MenuItem,
    		MenuFrame: DefaultMenu,
    		onMount,
    		height,
    		activeMenu
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(1, activeMenu = $$props.activeMenu);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [height, activeMenu, click_handler, menuframe_height_binding];
    }

    class Projects_2023 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$M, create_fragment$M, safe_not_equal, { height: 0, activeMenu: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects_2023",
    			options,
    			id: create_fragment$M.name
    		});
    	}

    	get height() {
    		throw new Error("<Projects_2023>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Projects_2023>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeMenu() {
    		throw new Error("<Projects_2023>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeMenu(value) {
    		throw new Error("<Projects_2023>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\NavProjectSelector.svelte generated by Svelte v3.55.1 */
    const file$K = "src\\component\\NavProjectSelector.svelte";

    // (40:0) <NavItem bind:open={isOpen} isMobile={ $Device["isMobile"] }>
    function create_default_slot$q(ctx) {
    	let dropdownmenu;
    	let current;

    	dropdownmenu = new DropdownMenu({
    			props: {
    				Menu: [
    					{ Name: 'main', Component: Projects_Main },
    					{ Name: '2021', Component: Projects_2021 },
    					{ Name: '2022', Component: Projects_2022 },
    					{ Name: '2023', Component: Projects_2023 }
    				]
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
    		p: noop,
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
    		id: create_default_slot$q.name,
    		type: "slot",
    		source: "(40:0) <NavItem bind:open={isOpen} isMobile={ $Device[\\\"isMobile\\\"] }>",
    		ctx
    	});

    	return block;
    }

    // (41:4) 
    function create_trigger_slot$1(ctx) {
    	let span;
    	let iconbutton;
    	let updating_showComment;
    	let current;
    	let mounted;
    	let dispose;

    	function iconbutton_showComment_binding(value) {
    		/*iconbutton_showComment_binding*/ ctx[4](value);
    	}

    	let iconbutton_props = {
    		path: mdiCodeGreaterThanOrEqual,
    		Comment: "Project"
    	};

    	if (/*isOpen*/ ctx[0] !== void 0) {
    		iconbutton_props.showComment = /*isOpen*/ ctx[0];
    	}

    	iconbutton = new IconButton({ props: iconbutton_props, $$inline: true });
    	binding_callbacks.push(() => bind(iconbutton, 'showComment', iconbutton_showComment_binding));

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(iconbutton.$$.fragment);
    			attr_dev(span, "slot", "trigger");
    			add_location(span, file$K, 40, 4, 1477);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(iconbutton, span, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(span, "click", /*click_handler*/ ctx[5], false, false, false),
    					listen_dev(span, "keypress", empty, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const iconbutton_changes = {};

    			if (!updating_showComment && dirty & /*isOpen*/ 1) {
    				updating_showComment = true;
    				iconbutton_changes.showComment = /*isOpen*/ ctx[0];
    				add_flush_callback(() => updating_showComment = false);
    			}

    			iconbutton.$set(iconbutton_changes);
    		},
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
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_trigger_slot$1.name,
    		type: "slot",
    		source: "(41:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$L(ctx) {
    	let div;
    	let navitem;
    	let updating_open;
    	let div_intro;
    	let current;

    	function navitem_open_binding(value) {
    		/*navitem_open_binding*/ ctx[6](value);
    	}

    	let navitem_props = {
    		isMobile: /*$Device*/ ctx[3]["isMobile"],
    		$$slots: {
    			trigger: [create_trigger_slot$1],
    			default: [create_default_slot$q]
    		},
    		$$scope: { ctx }
    	};

    	if (/*isOpen*/ ctx[0] !== void 0) {
    		navitem_props.open = /*isOpen*/ ctx[0];
    	}

    	navitem = new NavItem({ props: navitem_props, $$inline: true });
    	binding_callbacks.push(() => bind(navitem, 'open', navitem_open_binding));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navitem.$$.fragment);
    			attr_dev(div, "class", "Project svelte-8zmizv");
    			set_style(div, "height", /*height*/ ctx[1] + "px");
    			add_location(div, file$K, 38, 0, 1333);
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
    			if (dirty & /*$Device*/ 8) navitem_changes.isMobile = /*$Device*/ ctx[3]["isMobile"];

    			if (dirty & /*$$scope, pushFunc, isOpen*/ 4101) {
    				navitem_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*isOpen*/ 1) {
    				updating_open = true;
    				navitem_changes.open = /*isOpen*/ ctx[0];
    				add_flush_callback(() => updating_open = false);
    			}

    			navitem.$set(navitem_changes);

    			if (!current || dirty & /*height*/ 2) {
    				set_style(div, "height", /*height*/ ctx[1] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navitem.$$.fragment, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, { delay: 100 });
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
    		id: create_fragment$L.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function empty() {
    	
    }

    function instance$L($$self, $$props, $$invalidate) {
    	let $ContextVisible;
    	let $Device;
    	validate_store(ContextVisible, 'ContextVisible');
    	component_subscribe($$self, ContextVisible, $$value => $$invalidate(8, $ContextVisible = $$value));
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(3, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavProjectSelector', slots, []);
    	let SwitchStatus = $ContextVisible;
    	let width = 0;
    	let { height = 0 } = $$props;
    	let { isOpen = false } = $$props;
    	let { pushFunc } = $$props;
    	let UIStatus = {};

    	function SetUIStatus(UIType) {
    		for (var key in UIStatus) {
    			UIStatus[key] = "";
    		}

    		UIStatus[UIType] = mdiCheckBold;
    	} // if( $Device["isMobile"] ){
    	//     isOpen = false;

    	onMount(() => {
    		
    	});

    	$$self.$$.on_mount.push(function () {
    		if (pushFunc === undefined && !('pushFunc' in $$props || $$self.$$.bound[$$self.$$.props['pushFunc']])) {
    			console.warn("<NavProjectSelector> was created without expected prop 'pushFunc'");
    		}
    	});

    	const writable_props = ['height', 'isOpen', 'pushFunc'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavProjectSelector> was created with unknown prop '${key}'`);
    	});

    	function iconbutton_showComment_binding(value) {
    		isOpen = value;
    		$$invalidate(0, isOpen);
    	}

    	const click_handler = event => pushFunc("/projects");

    	function navitem_open_binding(value) {
    		isOpen = value;
    		$$invalidate(0, isOpen);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$props.isOpen);
    		if ('pushFunc' in $$props) $$invalidate(2, pushFunc = $$props.pushFunc);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		Device,
    		ContextVisible,
    		season,
    		mdiCodeGreaterThanOrEqual,
    		mdiCalendarMonthOutline,
    		NavItem,
    		DropdownMenu,
    		IconButton,
    		MenuItem,
    		jquery: jquery__default["default"],
    		onMount,
    		ToggleSwitch,
    		ProjectsMain: Projects_Main,
    		Projects_2021,
    		Projects_2022,
    		Projects_2023,
    		SwitchStatus,
    		width,
    		height,
    		isOpen,
    		pushFunc,
    		UIStatus,
    		SetUIStatus,
    		empty,
    		$ContextVisible,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('SwitchStatus' in $$props) SwitchStatus = $$props.SwitchStatus;
    		if ('width' in $$props) width = $$props.width;
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$props.isOpen);
    		if ('pushFunc' in $$props) $$invalidate(2, pushFunc = $$props.pushFunc);
    		if ('UIStatus' in $$props) UIStatus = $$props.UIStatus;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isOpen,
    		height,
    		pushFunc,
    		$Device,
    		iconbutton_showComment_binding,
    		click_handler,
    		navitem_open_binding
    	];
    }

    class NavProjectSelector extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$L, create_fragment$L, safe_not_equal, { height: 1, isOpen: 0, pushFunc: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavProjectSelector",
    			options,
    			id: create_fragment$L.name
    		});
    	}

    	get height() {
    		throw new Error("<NavProjectSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<NavProjectSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		throw new Error("<NavProjectSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error("<NavProjectSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pushFunc() {
    		throw new Error("<NavProjectSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pushFunc(value) {
    		throw new Error("<NavProjectSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\DropdownMenus\UISelect.svelte generated by Svelte v3.55.1 */

    const { console: console_1$2 } = globals;

    // (37:4) <MenuItem on:click={() => {          $ContextVisible = !$ContextVisible;      }} leftIcon={mdiTextBoxRemoveOutline } isChecked={false} >
    function create_default_slot_5(ctx) {
    	let t;
    	let toggleswitch;
    	let updating_checked;
    	let current;

    	function toggleswitch_checked_binding(value) {
    		/*toggleswitch_checked_binding*/ ctx[6](value);
    	}

    	let toggleswitch_props = {
    		label: "",
    		design: "slider",
    		fontSize: 12,
    		enableEvent: false
    	};

    	if (/*$ContextVisible*/ ctx[3] !== void 0) {
    		toggleswitch_props.checked = /*$ContextVisible*/ ctx[3];
    	}

    	toggleswitch = new ToggleSwitch({
    			props: toggleswitch_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(toggleswitch, 'checked', toggleswitch_checked_binding));

    	const block = {
    		c: function create() {
    			t = text("Context\r\n        ");
    			create_component(toggleswitch.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			mount_component(toggleswitch, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const toggleswitch_changes = {};

    			if (!updating_checked && dirty & /*$ContextVisible*/ 8) {
    				updating_checked = true;
    				toggleswitch_changes.checked = /*$ContextVisible*/ ctx[3];
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
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(37:4) <MenuItem on:click={() => {          $ContextVisible = !$ContextVisible;      }} leftIcon={mdiTextBoxRemoveOutline } isChecked={false} >",
    		ctx
    	});

    	return block;
    }

    // (42:4) <MenuItem on:click={() => {          $season = "Spring"          rerandering();          jquery(".full-landing-image").ripples('pause');          jquery(".full-landing-image").ripples('hide');      }} leftIcon={mdiSprout} isChecked={isChecked["Spring"]}>
    function create_default_slot_4(ctx) {
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
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(42:4) <MenuItem on:click={() => {          $season = \\\"Spring\\\"          rerandering();          jquery(\\\".full-landing-image\\\").ripples('pause');          jquery(\\\".full-landing-image\\\").ripples('hide');      }} leftIcon={mdiSprout} isChecked={isChecked[\\\"Spring\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (48:4) <MenuItem on:click={() => {          $season = "Summer"          rerandering();          jquery(".full-landing-image").ripples('play');          jquery(".full-landing-image").ripples('show');      }} leftIcon={mdiWaves} isChecked={isChecked["Summer"]}>
    function create_default_slot_3(ctx) {
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
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(48:4) <MenuItem on:click={() => {          $season = \\\"Summer\\\"          rerandering();          jquery(\\\".full-landing-image\\\").ripples('play');          jquery(\\\".full-landing-image\\\").ripples('show');      }} leftIcon={mdiWaves} isChecked={isChecked[\\\"Summer\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (54:4) <MenuItem on:click={() => {          $season = "Fall"          rerandering();          jquery(".full-landing-image").ripples('pause');          jquery(".full-landing-image").ripples('hide');      }}   leftIcon={mdiLeafMaple} isChecked={isChecked["Fall"]}>
    function create_default_slot_2(ctx) {
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
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(54:4) <MenuItem on:click={() => {          $season = \\\"Fall\\\"          rerandering();          jquery(\\\".full-landing-image\\\").ripples('pause');          jquery(\\\".full-landing-image\\\").ripples('hide');      }}   leftIcon={mdiLeafMaple} isChecked={isChecked[\\\"Fall\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (60:4) <MenuItem on:click={() => {          $season = "Winter"          rerandering();          jquery(".full-landing-image").ripples('pause');          jquery(".full-landing-image").ripples('hide');      }} leftIcon={mdiSnowflake} isChecked={isChecked["Winter"]}>
    function create_default_slot_1(ctx) {
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
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(60:4) <MenuItem on:click={() => {          $season = \\\"Winter\\\"          rerandering();          jquery(\\\".full-landing-image\\\").ripples('pause');          jquery(\\\".full-landing-image\\\").ripples('hide');      }} leftIcon={mdiSnowflake} isChecked={isChecked[\\\"Winter\\\"]}>",
    		ctx
    	});

    	return block;
    }

    // (36:0) <MenuFrame bind:height={height}>
    function create_default_slot$p(ctx) {
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
    				leftIcon: mdiTextBoxRemoveOutline,
    				isChecked: false,
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem0.$on("click", /*click_handler*/ ctx[7]);

    	menuitem1 = new MenuItem({
    			props: {
    				leftIcon: mdiSprout,
    				isChecked: /*isChecked*/ ctx[1]["Spring"],
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem1.$on("click", /*click_handler_1*/ ctx[8]);

    	menuitem2 = new MenuItem({
    			props: {
    				leftIcon: mdiWaves,
    				isChecked: /*isChecked*/ ctx[1]["Summer"],
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem2.$on("click", /*click_handler_2*/ ctx[9]);

    	menuitem3 = new MenuItem({
    			props: {
    				leftIcon: mdiLeafMaple,
    				isChecked: /*isChecked*/ ctx[1]["Fall"],
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem3.$on("click", /*click_handler_3*/ ctx[10]);

    	menuitem4 = new MenuItem({
    			props: {
    				leftIcon: mdiSnowflake,
    				isChecked: /*isChecked*/ ctx[1]["Winter"],
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menuitem4.$on("click", /*click_handler_4*/ ctx[11]);

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

    			if (dirty & /*$$scope, $ContextVisible*/ 8200) {
    				menuitem0_changes.$$scope = { dirty, ctx };
    			}

    			menuitem0.$set(menuitem0_changes);
    			const menuitem1_changes = {};
    			if (dirty & /*isChecked*/ 2) menuitem1_changes.isChecked = /*isChecked*/ ctx[1]["Spring"];

    			if (dirty & /*$$scope*/ 8192) {
    				menuitem1_changes.$$scope = { dirty, ctx };
    			}

    			menuitem1.$set(menuitem1_changes);
    			const menuitem2_changes = {};
    			if (dirty & /*isChecked*/ 2) menuitem2_changes.isChecked = /*isChecked*/ ctx[1]["Summer"];

    			if (dirty & /*$$scope*/ 8192) {
    				menuitem2_changes.$$scope = { dirty, ctx };
    			}

    			menuitem2.$set(menuitem2_changes);
    			const menuitem3_changes = {};
    			if (dirty & /*isChecked*/ 2) menuitem3_changes.isChecked = /*isChecked*/ ctx[1]["Fall"];

    			if (dirty & /*$$scope*/ 8192) {
    				menuitem3_changes.$$scope = { dirty, ctx };
    			}

    			menuitem3.$set(menuitem3_changes);
    			const menuitem4_changes = {};
    			if (dirty & /*isChecked*/ 2) menuitem4_changes.isChecked = /*isChecked*/ ctx[1]["Winter"];

    			if (dirty & /*$$scope*/ 8192) {
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
    		id: create_default_slot$p.name,
    		type: "slot",
    		source: "(36:0) <MenuFrame bind:height={height}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$K(ctx) {
    	let menuframe;
    	let updating_height;
    	let current;

    	function menuframe_height_binding(value) {
    		/*menuframe_height_binding*/ ctx[12](value);
    	}

    	let menuframe_props = {
    		$$slots: { default: [create_default_slot$p] },
    		$$scope: { ctx }
    	};

    	if (/*height*/ ctx[0] !== void 0) {
    		menuframe_props.height = /*height*/ ctx[0];
    	}

    	menuframe = new DefaultMenu({ props: menuframe_props, $$inline: true });
    	binding_callbacks.push(() => bind(menuframe, 'height', menuframe_height_binding));

    	const block = {
    		c: function create() {
    			create_component(menuframe.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(menuframe, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const menuframe_changes = {};

    			if (dirty & /*$$scope, isChecked, $season, $ContextVisible*/ 8206) {
    				menuframe_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_height && dirty & /*height*/ 1) {
    				updating_height = true;
    				menuframe_changes.height = /*height*/ ctx[0];
    				add_flush_callback(() => updating_height = false);
    			}

    			menuframe.$set(menuframe_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuframe.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuframe.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menuframe, detaching);
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
    	let $ContextVisible;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(2, $season = $$value));
    	validate_store(ContextVisible, 'ContextVisible');
    	component_subscribe($$self, ContextVisible, $$value => $$invalidate(3, $ContextVisible = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('UISelect', slots, []);
    	let { height } = $$props;
    	let { activeMenu = 'main' } = $$props;

    	let isChecked = {
    		"Spring": false,
    		"Summer": false,
    		"Fall": false,
    		"Winter": false
    	};

    	function rerandering() {
    		for (let i in isChecked) {
    			console.log(i);
    			console.log($season);
    			console.log(i == $season);
    			if (i == $season) $$invalidate(1, isChecked[i] = true, isChecked); else $$invalidate(1, isChecked[i] = false, isChecked);
    		}
    	}

    	onMount(() => {
    		$$invalidate(1, isChecked[$season] = true, isChecked);
    	});

    	$$self.$$.on_mount.push(function () {
    		if (height === undefined && !('height' in $$props || $$self.$$.bound[$$self.$$.props['height']])) {
    			console_1$2.warn("<UISelect> was created without expected prop 'height'");
    		}
    	});

    	const writable_props = ['height', 'activeMenu'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<UISelect> was created with unknown prop '${key}'`);
    	});

    	function toggleswitch_checked_binding(value) {
    		$ContextVisible = value;
    		ContextVisible.set($ContextVisible);
    	}

    	const click_handler = () => {
    		set_store_value(ContextVisible, $ContextVisible = !$ContextVisible, $ContextVisible);
    	};

    	const click_handler_1 = () => {
    		set_store_value(season, $season = "Spring", $season);
    		rerandering();
    		jquery__default["default"](".full-landing-image").ripples('pause');
    		jquery__default["default"](".full-landing-image").ripples('hide');
    	};

    	const click_handler_2 = () => {
    		set_store_value(season, $season = "Summer", $season);
    		rerandering();
    		jquery__default["default"](".full-landing-image").ripples('play');
    		jquery__default["default"](".full-landing-image").ripples('show');
    	};

    	const click_handler_3 = () => {
    		set_store_value(season, $season = "Fall", $season);
    		rerandering();
    		jquery__default["default"](".full-landing-image").ripples('pause');
    		jquery__default["default"](".full-landing-image").ripples('hide');
    	};

    	const click_handler_4 = () => {
    		set_store_value(season, $season = "Winter", $season);
    		rerandering();
    		jquery__default["default"](".full-landing-image").ripples('pause');
    		jquery__default["default"](".full-landing-image").ripples('hide');
    	};

    	function menuframe_height_binding(value) {
    		height = value;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(5, activeMenu = $$props.activeMenu);
    	};

    	$$self.$capture_state = () => ({
    		MenuItem,
    		MenuFrame: DefaultMenu,
    		ContextVisible,
    		season,
    		mdiSprout,
    		mdiWaves,
    		mdiSnowflake,
    		mdiLeafMaple,
    		mdiTextBoxRemoveOutline,
    		jquery: jquery__default["default"],
    		ToggleSwitch,
    		onMount,
    		height,
    		activeMenu,
    		isChecked,
    		rerandering,
    		$season,
    		$ContextVisible
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('activeMenu' in $$props) $$invalidate(5, activeMenu = $$props.activeMenu);
    		if ('isChecked' in $$props) $$invalidate(1, isChecked = $$props.isChecked);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		height,
    		isChecked,
    		$season,
    		$ContextVisible,
    		rerandering,
    		activeMenu,
    		toggleswitch_checked_binding,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		menuframe_height_binding
    	];
    }

    class UISelect extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$K, create_fragment$K, safe_not_equal, { height: 0, activeMenu: 5 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "UISelect",
    			options,
    			id: create_fragment$K.name
    		});
    	}

    	get height() {
    		throw new Error("<UISelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<UISelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeMenu() {
    		throw new Error("<UISelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeMenu(value) {
    		throw new Error("<UISelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\NavUISelector.svelte generated by Svelte v3.55.1 */

    const { console: console_1$1 } = globals;
    const file$J = "src\\component\\NavUISelector.svelte";

    // (36:4) <NavItem bind:open={isOpen} isMobile={ $Device["isMobile"] }>
    function create_default_slot$o(ctx) {
    	let dropdownmenu;
    	let current;

    	dropdownmenu = new DropdownMenu({
    			props: {
    				Menu: [{ Name: 'main', Component: UISelect }]
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
    		p: noop,
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
    		id: create_default_slot$o.name,
    		type: "slot",
    		source: "(36:4) <NavItem bind:open={isOpen} isMobile={ $Device[\\\"isMobile\\\"] }>",
    		ctx
    	});

    	return block;
    }

    // (37:8) 
    function create_trigger_slot(ctx) {
    	let span;
    	let iconbutton;
    	let updating_showComment;
    	let current;

    	function iconbutton_showComment_binding(value) {
    		/*iconbutton_showComment_binding*/ ctx[3](value);
    	}

    	let iconbutton_props = {
    		path: mdiCodeBrackets,
    		Comment: "Select UI"
    	};

    	if (/*isOpen*/ ctx[0] !== void 0) {
    		iconbutton_props.showComment = /*isOpen*/ ctx[0];
    	}

    	iconbutton = new IconButton({ props: iconbutton_props, $$inline: true });
    	binding_callbacks.push(() => bind(iconbutton, 'showComment', iconbutton_showComment_binding));

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(iconbutton.$$.fragment);
    			attr_dev(span, "slot", "trigger");
    			add_location(span, file$J, 36, 8, 1132);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(iconbutton, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const iconbutton_changes = {};

    			if (!updating_showComment && dirty & /*isOpen*/ 1) {
    				updating_showComment = true;
    				iconbutton_changes.showComment = /*isOpen*/ ctx[0];
    				add_flush_callback(() => updating_showComment = false);
    			}

    			iconbutton.$set(iconbutton_changes);
    		},
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
    		source: "(37:8) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$J(ctx) {
    	let div;
    	let navitem;
    	let updating_open;
    	let div_intro;
    	let current;

    	function navitem_open_binding(value) {
    		/*navitem_open_binding*/ ctx[4](value);
    	}

    	let navitem_props = {
    		isMobile: /*$Device*/ ctx[2]["isMobile"],
    		$$slots: {
    			trigger: [create_trigger_slot],
    			default: [create_default_slot$o]
    		},
    		$$scope: { ctx }
    	};

    	if (/*isOpen*/ ctx[0] !== void 0) {
    		navitem_props.open = /*isOpen*/ ctx[0];
    	}

    	navitem = new NavItem({ props: navitem_props, $$inline: true });
    	binding_callbacks.push(() => bind(navitem, 'open', navitem_open_binding));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navitem.$$.fragment);
    			attr_dev(div, "class", "UISelector svelte-19ge23v");
    			set_style(div, "height", /*height*/ ctx[1] + "px");
    			add_location(div, file$J, 34, 0, 977);
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
    			if (dirty & /*$Device*/ 4) navitem_changes.isMobile = /*$Device*/ ctx[2]["isMobile"];

    			if (dirty & /*$$scope, isOpen*/ 2049) {
    				navitem_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*isOpen*/ 1) {
    				updating_open = true;
    				navitem_changes.open = /*isOpen*/ ctx[0];
    				add_flush_callback(() => updating_open = false);
    			}

    			navitem.$set(navitem_changes);

    			if (!current || dirty & /*height*/ 2) {
    				set_style(div, "height", /*height*/ ctx[1] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navitem.$$.fragment, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, { delay: 100 });
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
    		id: create_fragment$J.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$J($$self, $$props, $$invalidate) {
    	let $season;
    	let $ContextVisible;
    	let $Device;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(6, $season = $$value));
    	validate_store(ContextVisible, 'ContextVisible');
    	component_subscribe($$self, ContextVisible, $$value => $$invalidate(7, $ContextVisible = $$value));
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(2, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavUISelector', slots, []);
    	let SwitchStatus = $ContextVisible;
    	let width = 0;

    	let isChecked = {
    		"Spring": false,
    		"Summer": false,
    		"Fall": false,
    		"Winter": false
    	};

    	let { height = 0 } = $$props;
    	let { isOpen = false } = $$props;

    	function rerandering() {
    		for (let i in isChecked) {
    			console.log(i);
    			console.log($season);
    			console.log(i == $season);
    			if (i == $season) isChecked[i] = true; else isChecked[i] = false;
    		}
    	}

    	const writable_props = ['height', 'isOpen'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<NavUISelector> was created with unknown prop '${key}'`);
    	});

    	function iconbutton_showComment_binding(value) {
    		isOpen = value;
    		$$invalidate(0, isOpen);
    	}

    	function navitem_open_binding(value) {
    		isOpen = value;
    		$$invalidate(0, isOpen);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$props.isOpen);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		Device,
    		ContextVisible,
    		season,
    		mdiCodeBrackets,
    		NavItem,
    		DropdownMenu,
    		IconButton,
    		UiSelect: UISelect,
    		SwitchStatus,
    		width,
    		isChecked,
    		height,
    		isOpen,
    		rerandering,
    		$season,
    		$ContextVisible,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('SwitchStatus' in $$props) SwitchStatus = $$props.SwitchStatus;
    		if ('width' in $$props) width = $$props.width;
    		if ('isChecked' in $$props) isChecked = $$props.isChecked;
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$props.isOpen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isOpen, height, $Device, iconbutton_showComment_binding, navitem_open_binding];
    }

    class NavUISelector extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$J, create_fragment$J, safe_not_equal, { height: 1, isOpen: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavUISelector",
    			options,
    			id: create_fragment$J.name
    		});
    	}

    	get height() {
    		throw new Error("<NavUISelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<NavUISelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		throw new Error("<NavUISelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error("<NavUISelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Navbar.svelte generated by Svelte v3.55.1 */
    const file$I = "src\\component\\Navbar.svelte";

    function create_fragment$I(ctx) {
    	let div2;
    	let div0;
    	let navlogo;
    	let t0;
    	let div1;
    	let profile;
    	let updating_isOpen;
    	let t1;
    	let project;
    	let updating_isOpen_1;
    	let t2;
    	let outsourcing;
    	let updating_isOpen_2;
    	let t3;
    	let git;
    	let updating_isOpen_3;
    	let t4;
    	let navuiselector;
    	let updating_isOpen_4;
    	let div2_resize_listener;
    	let current;
    	let mounted;
    	let dispose;

    	navlogo = new Navlogo({
    			props: { pushFunc: /*pushRouter*/ ctx[6] },
    			$$inline: true
    		});

    	function profile_isOpen_binding(value) {
    		/*profile_isOpen_binding*/ ctx[8](value);
    	}

    	let profile_props = {
    		height: /*height*/ ctx[0] - 22,
    		pushFunc: /*pushRouter*/ ctx[6]
    	};

    	if (/*Profile_isOpen*/ ctx[1] !== void 0) {
    		profile_props.isOpen = /*Profile_isOpen*/ ctx[1];
    	}

    	profile = new NavProfile({ props: profile_props, $$inline: true });
    	binding_callbacks.push(() => bind(profile, 'isOpen', profile_isOpen_binding));

    	function project_isOpen_binding(value) {
    		/*project_isOpen_binding*/ ctx[9](value);
    	}

    	let project_props = {
    		height: /*height*/ ctx[0] - 22,
    		pushFunc: /*pushRouter*/ ctx[6]
    	};

    	if (/*Project_isOpen*/ ctx[2] !== void 0) {
    		project_props.isOpen = /*Project_isOpen*/ ctx[2];
    	}

    	project = new NavProjectSelector({ props: project_props, $$inline: true });
    	binding_callbacks.push(() => bind(project, 'isOpen', project_isOpen_binding));

    	function outsourcing_isOpen_binding(value) {
    		/*outsourcing_isOpen_binding*/ ctx[10](value);
    	}

    	let outsourcing_props = {
    		height: /*height*/ ctx[0] - 22,
    		pushFunc: /*pushRouter*/ ctx[6]
    	};

    	if (/*Outsourcing_isOpen*/ ctx[3] !== void 0) {
    		outsourcing_props.isOpen = /*Outsourcing_isOpen*/ ctx[3];
    	}

    	outsourcing = new NavOutsourcingSelector({ props: outsourcing_props, $$inline: true });
    	binding_callbacks.push(() => bind(outsourcing, 'isOpen', outsourcing_isOpen_binding));

    	function git_isOpen_binding(value) {
    		/*git_isOpen_binding*/ ctx[11](value);
    	}

    	let git_props = { height: /*height*/ ctx[0] - 22 };

    	if (/*Git_isOpen*/ ctx[4] !== void 0) {
    		git_props.isOpen = /*Git_isOpen*/ ctx[4];
    	}

    	git = new NavGithub({ props: git_props, $$inline: true });
    	binding_callbacks.push(() => bind(git, 'isOpen', git_isOpen_binding));

    	function navuiselector_isOpen_binding(value) {
    		/*navuiselector_isOpen_binding*/ ctx[12](value);
    	}

    	let navuiselector_props = { height: /*height*/ ctx[0] - 22 };

    	if (/*NavUISelector_isOpen*/ ctx[5] !== void 0) {
    		navuiselector_props.isOpen = /*NavUISelector_isOpen*/ ctx[5];
    	}

    	navuiselector = new NavUISelector({
    			props: navuiselector_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(navuiselector, 'isOpen', navuiselector_isOpen_binding));

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(navlogo.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			create_component(profile.$$.fragment);
    			t1 = space();
    			create_component(project.$$.fragment);
    			t2 = space();
    			create_component(outsourcing.$$.fragment);
    			t3 = space();
    			create_component(git.$$.fragment);
    			t4 = space();
    			create_component(navuiselector.$$.fragment);
    			set_style(div0, "left", "11px");
    			add_location(div0, file$I, 63, 2, 1458);
    			set_style(div1, "float", "right");
    			add_location(div1, file$I, 66, 2, 1591);
    			attr_dev(div2, "class", "NavBar svelte-45ui97");
    			add_render_callback(() => /*div2_elementresize_handler*/ ctx[13].call(div2));
    			add_location(div2, file$I, 61, 0, 1406);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(navlogo, div0, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			mount_component(profile, div1, null);
    			append_dev(div1, t1);
    			mount_component(project, div1, null);
    			append_dev(div1, t2);
    			mount_component(outsourcing, div1, null);
    			append_dev(div1, t3);
    			mount_component(git, div1, null);
    			append_dev(div1, t4);
    			mount_component(navuiselector, div1, null);
    			div2_resize_listener = add_resize_listener(div2, /*div2_elementresize_handler*/ ctx[13].bind(div2));
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*click_handler*/ ctx[7], false, false, false),
    					listen_dev(div0, "keypress", keypress_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const profile_changes = {};
    			if (dirty & /*height*/ 1) profile_changes.height = /*height*/ ctx[0] - 22;

    			if (!updating_isOpen && dirty & /*Profile_isOpen*/ 2) {
    				updating_isOpen = true;
    				profile_changes.isOpen = /*Profile_isOpen*/ ctx[1];
    				add_flush_callback(() => updating_isOpen = false);
    			}

    			profile.$set(profile_changes);
    			const project_changes = {};
    			if (dirty & /*height*/ 1) project_changes.height = /*height*/ ctx[0] - 22;

    			if (!updating_isOpen_1 && dirty & /*Project_isOpen*/ 4) {
    				updating_isOpen_1 = true;
    				project_changes.isOpen = /*Project_isOpen*/ ctx[2];
    				add_flush_callback(() => updating_isOpen_1 = false);
    			}

    			project.$set(project_changes);
    			const outsourcing_changes = {};
    			if (dirty & /*height*/ 1) outsourcing_changes.height = /*height*/ ctx[0] - 22;

    			if (!updating_isOpen_2 && dirty & /*Outsourcing_isOpen*/ 8) {
    				updating_isOpen_2 = true;
    				outsourcing_changes.isOpen = /*Outsourcing_isOpen*/ ctx[3];
    				add_flush_callback(() => updating_isOpen_2 = false);
    			}

    			outsourcing.$set(outsourcing_changes);
    			const git_changes = {};
    			if (dirty & /*height*/ 1) git_changes.height = /*height*/ ctx[0] - 22;

    			if (!updating_isOpen_3 && dirty & /*Git_isOpen*/ 16) {
    				updating_isOpen_3 = true;
    				git_changes.isOpen = /*Git_isOpen*/ ctx[4];
    				add_flush_callback(() => updating_isOpen_3 = false);
    			}

    			git.$set(git_changes);
    			const navuiselector_changes = {};
    			if (dirty & /*height*/ 1) navuiselector_changes.height = /*height*/ ctx[0] - 22;

    			if (!updating_isOpen_4 && dirty & /*NavUISelector_isOpen*/ 32) {
    				updating_isOpen_4 = true;
    				navuiselector_changes.isOpen = /*NavUISelector_isOpen*/ ctx[5];
    				add_flush_callback(() => updating_isOpen_4 = false);
    			}

    			navuiselector.$set(navuiselector_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navlogo.$$.fragment, local);
    			transition_in(profile.$$.fragment, local);
    			transition_in(project.$$.fragment, local);
    			transition_in(outsourcing.$$.fragment, local);
    			transition_in(git.$$.fragment, local);
    			transition_in(navuiselector.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navlogo.$$.fragment, local);
    			transition_out(profile.$$.fragment, local);
    			transition_out(project.$$.fragment, local);
    			transition_out(outsourcing.$$.fragment, local);
    			transition_out(git.$$.fragment, local);
    			transition_out(navuiselector.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(navlogo);
    			destroy_component(profile);
    			destroy_component(project);
    			destroy_component(outsourcing);
    			destroy_component(git);
    			destroy_component(navuiselector);
    			div2_resize_listener();
    			mounted = false;
    			run_all(dispose);
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

    const keypress_handler = () => {
    	
    };

    function instance$I($$self, $$props, $$invalidate) {
    	let $LastPage;
    	validate_store(LastPage, 'LastPage');
    	component_subscribe($$self, LastPage, $$value => $$invalidate(15, $LastPage = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, []);
    	let { height } = $$props;
    	let isOpen = false;
    	let isOpen_pre = false;
    	let uiSelectorLocation = 11;
    	let Profile_isOpen = false;
    	let Project_isOpen = false;
    	let Outsourcing_isOpen = false;
    	let Git_isOpen = false;
    	let NavUISelector_isOpen = false;

    	function pushRouter(link) {
    		link = link.toLowerCase();
    		var layers = link.split('/');

    		for (let i = 0; i < layers.length; i++) {
    			set_store_value(LastPage, $LastPage["Layer" + i.toString()] = layers[i], $LastPage);
    		}

    		push(link);
    	}

    	function calcLeft() {
    		if (document.body.clientWidth <= 767) {
    			uiSelectorLocation = 60;
    		} else uiSelectorLocation = 11;
    	}

    	onMount(() => {
    		calcLeft();
    	});

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
    		pushRouter("/");
    	};

    	function profile_isOpen_binding(value) {
    		Profile_isOpen = value;
    		$$invalidate(1, Profile_isOpen);
    	}

    	function project_isOpen_binding(value) {
    		Project_isOpen = value;
    		$$invalidate(2, Project_isOpen);
    	}

    	function outsourcing_isOpen_binding(value) {
    		Outsourcing_isOpen = value;
    		$$invalidate(3, Outsourcing_isOpen);
    	}

    	function git_isOpen_binding(value) {
    		Git_isOpen = value;
    		$$invalidate(4, Git_isOpen);
    	}

    	function navuiselector_isOpen_binding(value) {
    		NavUISelector_isOpen = value;
    		$$invalidate(5, NavUISelector_isOpen);
    	}

    	function div2_elementresize_handler() {
    		height = this.clientHeight;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    	};

    	$$self.$capture_state = () => ({
    		Collapse,
    		Navbar,
    		Nav,
    		NavItem: NavItem$1,
    		NavLink,
    		NavbarToggler,
    		Dropdown,
    		DropdownToggle,
    		DropdownMenu: DropdownMenu$1,
    		DropdownItem,
    		NavLogo: Navlogo,
    		Profile: NavProfile,
    		Git: NavGithub,
    		Outsourcing: NavOutsourcingSelector,
    		Project: NavProjectSelector,
    		NavUISelector,
    		push,
    		LastPage,
    		onMount,
    		IconButton,
    		height,
    		isOpen,
    		isOpen_pre,
    		uiSelectorLocation,
    		Profile_isOpen,
    		Project_isOpen,
    		Outsourcing_isOpen,
    		Git_isOpen,
    		NavUISelector_isOpen,
    		pushRouter,
    		calcLeft,
    		$LastPage
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('isOpen' in $$props) isOpen = $$props.isOpen;
    		if ('isOpen_pre' in $$props) isOpen_pre = $$props.isOpen_pre;
    		if ('uiSelectorLocation' in $$props) uiSelectorLocation = $$props.uiSelectorLocation;
    		if ('Profile_isOpen' in $$props) $$invalidate(1, Profile_isOpen = $$props.Profile_isOpen);
    		if ('Project_isOpen' in $$props) $$invalidate(2, Project_isOpen = $$props.Project_isOpen);
    		if ('Outsourcing_isOpen' in $$props) $$invalidate(3, Outsourcing_isOpen = $$props.Outsourcing_isOpen);
    		if ('Git_isOpen' in $$props) $$invalidate(4, Git_isOpen = $$props.Git_isOpen);
    		if ('NavUISelector_isOpen' in $$props) $$invalidate(5, NavUISelector_isOpen = $$props.NavUISelector_isOpen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		height,
    		Profile_isOpen,
    		Project_isOpen,
    		Outsourcing_isOpen,
    		Git_isOpen,
    		NavUISelector_isOpen,
    		pushRouter,
    		click_handler,
    		profile_isOpen_binding,
    		project_isOpen_binding,
    		outsourcing_isOpen_binding,
    		git_isOpen_binding,
    		navuiselector_isOpen_binding,
    		div2_elementresize_handler
    	];
    }

    class Navbar_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$I, create_fragment$I, safe_not_equal, { height: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar_1",
    			options,
    			id: create_fragment$I.name
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
    const file$H = "src\\component\\Snowflakes.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    // (169:4) {#each snowflakes as flake}
    function create_each_block$2(ctx) {
    	let div;
    	let t0_value = /*flake*/ ctx[14].snowIcon + "";
    	let t0;
    	let t1;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(div, "class", "snowflake svelte-1d2e7rn");
    			attr_dev(div, "style", div_style_value = `opacity: ${/*flake*/ ctx[14].opacity}; transform: scale(${/*flake*/ ctx[14].scale}) rotate(${/*flake*/ ctx[14].rotation}deg); left: ${/*flake*/ ctx[14].x}%; top: calc(${/*flake*/ ctx[14].y}% - ${/*flake*/ ctx[14].scale}rem)`);
    			add_location(div, file$H, 169, 6, 5782);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*snowflakes*/ 1 && t0_value !== (t0_value = /*flake*/ ctx[14].snowIcon + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*snowflakes*/ 1 && div_style_value !== (div_style_value = `opacity: ${/*flake*/ ctx[14].opacity}; transform: scale(${/*flake*/ ctx[14].scale}) rotate(${/*flake*/ ctx[14].rotation}deg); left: ${/*flake*/ ctx[14].x}%; top: calc(${/*flake*/ ctx[14].y}% - ${/*flake*/ ctx[14].scale}rem)`)) {
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
    		source: "(169:4) {#each snowflakes as flake}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$H(ctx) {
    	let div;
    	let mounted;
    	let dispose;
    	let each_value = /*snowflakes*/ ctx[0];
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

    			attr_dev(div, "class", "snowframe");
    			attr_dev(div, "aria-hidden", "true");
    			add_location(div, file$H, 167, 0, 5699);
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
    				dispose = [
    					listen_dev(window, "touchmove", /*handleTouchMove*/ ctx[2], false, false, false),
    					listen_dev(window, "mousemove", /*handleMouseMove*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*snowflakes*/ 1) {
    				each_value = /*snowflakes*/ ctx[0];
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
    			run_all(dispose);
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

    function instance$H($$self, $$props, $$invalidate) {
    	let $season;
    	let $Device;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(8, $season = $$value));
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(9, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Snowflakes', slots, []);
    	const SNOW_ICONS = ['❆', '❅', '❄'];
    	const MS_BETWEEN_FRAMES = 1000 / TARGET_FPS$2;
    	let mx = 0;
    	let my = 0;
    	let dx = 0;
    	let dy = 0;
    	let timer;
    	const MousePowerOffet = $Device["isMobile"] ? 10 : 5;

    	function handleMouseMove({ clientX, clientY }) {
    		if (!$Device["isMobile"]) {
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
    	}

    	function handleTouchMove(e) {
    		if ($Device["isMobile"]) {
    			clearTimeout(timer);

    			timer = setTimeout(
    				() => {
    					dx = 0;
    					dy = 0;
    				},
    				50
    			);

    			dx = mx - e.touches[0].clientX;
    			dy = my - e.touches[0].clientY;
    			mx = e.touches[0].clientX;
    			my = e.touches[0].clientY;
    		}
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
    							-1 / distance * MousePowerOffet * dx / document.body.clientWidth,
    							-1 / distance * MousePowerOffet * dy / document.body.clientHeight
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
    		Device,
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
    		MousePowerOffet,
    		handleMouseMove,
    		handleTouchMove,
    		getPower: getPower$2,
    		getDir: getDir$1,
    		randomSnowflakeConfig,
    		snowflakes,
    		$season,
    		$Device
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

    	return [snowflakes, handleMouseMove, handleTouchMove];
    }

    class Snowflakes extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$H, create_fragment$H, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Snowflakes",
    			options,
    			id: create_fragment$H.name
    		});
    	}
    }

    /* src\component\Sakura.svelte generated by Svelte v3.55.1 */
    const file$G = "src\\component\\Sakura.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (173:4) {#each sakuraflakes as flake}
    function create_each_block$1(ctx) {
    	let div;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "sakuraflake svelte-fdqqpk");

    			attr_dev(div, "style", div_style_value = `opacity: ${/*flake*/ ctx[12].opacity}; height: ${/*flake*/ ctx[12].height}; width: ${/*flake*/ ctx[12].width}; border-radius: ${/*flake*/ ctx[12].borderRadius[0]}px ${/*flake*/ ctx[12].borderRadius[1]}px;
        transform: scale(1) rotate(${/*flake*/ ctx[12].rotation}deg); left: ${/*flake*/ ctx[12].x}%; top: calc(${/*flake*/ ctx[12].y}% - 1rem)`);

    			add_location(div, file$G, 173, 6, 5921);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sakuraflakes*/ 1 && div_style_value !== (div_style_value = `opacity: ${/*flake*/ ctx[12].opacity}; height: ${/*flake*/ ctx[12].height}; width: ${/*flake*/ ctx[12].width}; border-radius: ${/*flake*/ ctx[12].borderRadius[0]}px ${/*flake*/ ctx[12].borderRadius[1]}px;
        transform: scale(1) rotate(${/*flake*/ ctx[12].rotation}deg); left: ${/*flake*/ ctx[12].x}%; top: calc(${/*flake*/ ctx[12].y}% - 1rem)`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(173:4) {#each sakuraflakes as flake}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$G(ctx) {
    	let div;
    	let mounted;
    	let dispose;
    	let each_value = /*sakuraflakes*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "sakuraframe");
    			attr_dev(div, "aria-hidden", "true");
    			add_location(div, file$G, 171, 0, 5834);
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
    				dispose = [
    					listen_dev(window, "touchmove", /*handleTouchMove*/ ctx[2], false, false, false),
    					listen_dev(window, "mousemove", /*handleMouseMove*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*sakuraflakes*/ 1) {
    				each_value = /*sakuraflakes*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
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
    			run_all(dispose);
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

    function instance$G($$self, $$props, $$invalidate) {
    	let $season;
    	let $Device;
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(8, $season = $$value));
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(9, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sakura', slots, []);
    	const MS_BETWEEN_FRAMES = 1000 / TARGET_FPS$1;
    	let mx = 0;
    	let my = 0;
    	let dx = 0;
    	let dy = 0;
    	let timer;
    	const MousePowerOffet = $Device["isMobile"] ? 10 : 5;

    	function handleMouseMove({ clientX, clientY }) {
    		if (!$Device["isMobile"]) {
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
    	}

    	function handleTouchMove(e) {
    		if ($Device["isMobile"]) {
    			clearTimeout(timer);

    			timer = setTimeout(
    				() => {
    					dx = 0;
    					dy = 0;
    				},
    				50
    			);

    			dx = mx - e.touches[0].clientX;
    			dy = my - e.touches[0].clientY;
    			mx = e.touches[0].clientX;
    			my = e.touches[0].clientY;
    		}
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
    							-1 / distance * MousePowerOffet * dx / document.body.clientWidth,
    							-1 / distance * MousePowerOffet * dy / document.body.clientHeight
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
    		Device,
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
    		MousePowerOffet,
    		getPower: getPower$1,
    		getDir,
    		handleMouseMove,
    		handleTouchMove,
    		randomSnowflakeConfig,
    		sakuraflakes,
    		$season,
    		$Device
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

    	return [sakuraflakes, handleMouseMove, handleTouchMove];
    }

    class Sakura extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$G, create_fragment$G, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sakura",
    			options,
    			id: create_fragment$G.name
    		});
    	}
    }

    /* src\component\Fish.svelte generated by Svelte v3.55.1 */
    const file$F = "src\\component\\Fish.svelte";

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
    function create_if_block_4$1(ctx) {
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
    		id: create_if_block_4$1.name,
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
    function create_if_block_2$2(ctx) {
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
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(176:27) ",
    		ctx
    	});

    	return block;
    }

    // (174:27) 
    function create_if_block_1$3(ctx) {
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
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(174:27) ",
    		ctx
    	});

    	return block;
    }

    // (172:8) {#if idx == 0}
    function create_if_block$6(ctx) {
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
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(172:8) {#if idx == 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$F(ctx) {
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
    		if (/*idx*/ ctx[1] == 0) return create_if_block$6;
    		if (/*idx*/ ctx[1] == 1) return create_if_block_1$3;
    		if (/*idx*/ ctx[1] == 2) return create_if_block_2$2;
    		if (/*idx*/ ctx[1] == 3) return create_if_block_3$1;
    		if (/*idx*/ ctx[1] == 4) return create_if_block_4$1;
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
    			add_location(br, file$F, 168, 4, 5726);
    			add_location(b, file$F, 169, 4, 5737);
    			add_location(pre, file$F, 167, 4, 5715);
    			attr_dev(div, "class", "Fish svelte-1bi078q");
    			set_style(div, "transform", "translate(-50%, -50%) rotate(" + (Math.atan2(/*config*/ ctx[0].movingVector[1], /*config*/ ctx[0].movingVector[0]) + Math.PI / 2) + "rad) scale(" + /*config*/ ctx[0].scale + ")");
    			set_style(div, "left", /*config*/ ctx[0].startPoint[0] + "%");
    			set_style(div, "top", /*config*/ ctx[0].startPoint[1] + "%");
    			add_location(div, file$F, 166, 0, 5480);
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
    		id: create_fragment$F.name,
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

    function instance$F($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$F, create_fragment$F, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Fish",
    			options,
    			id: create_fragment$F.name
    		});
    	}
    }

    /* src\component\Lake.svelte generated by Svelte v3.55.1 */
    const file$E = "src\\component\\Lake.svelte";

    function create_fragment$E(ctx) {
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
    			add_location(div, file$E, 13, 0, 380);
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
    		id: create_fragment$E.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$E($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$E, create_fragment$E, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Lake",
    			options,
    			id: create_fragment$E.name
    		});
    	}
    }

    /* src\component\Park.svelte generated by Svelte v3.55.1 */
    const file$D = "src\\component\\Park.svelte";

    function create_fragment$D(ctx) {
    	let div1;
    	let canvas_1;
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
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			canvas_1 = element("canvas");
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
    			attr_dev(canvas_1, "width", /*canvasWidth*/ ctx[2]);
    			attr_dev(canvas_1, "height", /*canvasHeight*/ ctx[3]);
    			add_location(canvas_1, file$D, 221, 4, 8360);
    			add_location(br, file$D, 224, 8, 8515);
    			add_location(b, file$D, 225, 8, 8530);
    			add_location(pre, file$D, 223, 8, 8500);
    			attr_dev(div0, "class", "Bench svelte-1fw58m6");
    			set_style(div0, "top", "90%");
    			set_style(div0, "left", "20%");
    			add_location(div0, file$D, 222, 4, 8444);
    			attr_dev(div1, "class", "Park svelte-1fw58m6");
    			add_location(div1, file$D, 220, 0, 8334);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, canvas_1);
    			/*canvas_1_binding*/ ctx[5](canvas_1);
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

    			if (!mounted) {
    				dispose = listen_dev(window, "mousedown", /*handleMouseDown*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$bench*/ 2) set_data_dev(t4, /*$bench*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			/*canvas_1_binding*/ ctx[5](null);
    			mounted = false;
    			dispose();
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

    const defaultThickness = 20;

    function toUnitVector(x, y) {
    	let pow = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    	return { x: x / pow, y: y / pow };
    }

    function generateRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min) + min);
    }

    function hsl(lightness, layer) {
    	return 'hsl(' + lightness + ',70%,' + 100 * Math.pow(0.95, layer) + '%)';
    }

    function instance$D($$self, $$props, $$invalidate) {
    	let $Device;
    	let $bench;
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(11, $Device = $$value));
    	validate_store(bench, 'bench');
    	component_subscribe($$self, bench, $$value => $$invalidate(1, $bench = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Park', slots, []);
    	var smallest_mag = 10;
    	let mouse = [0, 0];
    	let pmouse = [0, 0];
    	let BenchRect;
    	let config = [];
    	let Max = $Device["isMobile"] ? 5 : 20;
    	var canvasWidth = document.body.clientWidth;
    	var canvasHeight = document.body.clientHeight;
    	var canvas;
    	var ctx;
    	var trees = [];

    	function createBranch(layer, startPoint, vector, power, mag, lightness) {
    		var grd = ctx.createLinearGradient(startPoint.x, startPoint.y, startPoint.x + power * vector.x, startPoint.y + power * vector.y);
    		grd.addColorStop(0, hsl(lightness, layer - 1));
    		grd.addColorStop(1, hsl(lightness, layer));

    		return {
    			layer,
    			startPoint,
    			unitVector: vector,
    			power,
    			mag,
    			lightness,
    			grd
    		};
    	}

    	function createTreeConfig() {
    		let origin = {
    			x: mouse[0],
    			y: document.body.clientHeight - 20 - 40 * Math.random()
    		};

    		let unitVector = { x: 0, y: -1 };
    		let power = generateRandomInt(300, 500);
    		let lightness = 360 * Math.random();
    		let mag = generateRandomInt(100, 115);

    		let config = {
    			DrawingLayer: 0,
    			timer: 0,
    			MaximumTimer: generateRandomInt(60, 120),
    			Layer: 0,
    			branches: [[createBranch(0, origin, unitVector, power, mag, lightness)]]
    		};

    		createChildBranch(config, config.branches[0][0]);
    		config.Layer = config.branches.length;
    		trees.push({ isDrawn: false, config });
    	}

    	function createChildBranch(config, branch) {
    		if (branch.mag > 50) {
    			// console.log(branch);
    			if (config.branches[branch.layer + 1] == undefined) {
    				config.branches[branch.layer + 1] = [];
    			} // console.log(base.branches[branch.layer][0].power)

    			let branchCount = branch.layer == 0
    			? generateRandomInt(3, 5)
    			: generateRandomInt(5, 7);

    			let top = 1;
    			let sideLeft = 0;
    			let sideRight = 0;

    			if (branchCount % 2 == 0) {
    				if (Math.random() > 0.5) {
    					sideLeft = branchCount / 2;
    					sideRight = branchCount - top - sideLeft;
    				} else {
    					sideRight = branchCount / 2;
    					sideLeft = branchCount - top - sideRight;
    				}
    			} else {
    				sideRight = sideLeft = (branchCount - top) / 2;
    			}

    			createTopBranch(config, branch);
    			createLeftBranch(config, branch, sideLeft);
    			createRightBranch(config, branch, sideRight);

    			for (let i = 0; i < config.branches[branch.layer + 1].length; i++) {
    				createChildBranch(config, config.branches[branch.layer + 1][i]);
    			}
    		}
    	}

    	function createTopBranch(config, branch) {
    		var unitVector_c = toUnitVector(branch.unitVector.x + 0.25 - 0.5 * Math.random(), branch.unitVector.y);
    		var power2 = branch.power * (Math.random() * 0.1 + 0.8 / (branch.layer + 1));
    		var lightness2 = branch.lightness * 0.9;
    		var mag2 = branch.mag * (Math.random() * 0.05 + 0.7);

    		var newBranch = createBranch(
    			branch.layer + 1,
    			{
    				x: branch.startPoint.x + branch.unitVector.x * branch.power,
    				y: branch.startPoint.y + branch.unitVector.y * branch.power
    			},
    			unitVector_c,
    			power2,
    			mag2,
    			lightness2
    		);

    		config.branches[newBranch.layer].push(newBranch);
    	}

    	function createLeftBranch(config, branch, sideLeft) {
    		for (let i = 0; i < sideLeft; i++) {
    			var unitVector_c = toUnitVector(branch.unitVector.x + 0.6 - 0.3 * i * Math.random(), branch.unitVector.y);
    			var power2 = branch.power * (Math.random() * 0.1 + 0.8 / (branch.layer + 1));
    			var lightness2 = branch.lightness * 0.9;
    			var offset = 0.2 + 0.2 * i + 0.3 * Math.random();
    			var mag2 = branch.mag * (Math.random() * 0.1 + 0.7);

    			var newBranch = createBranch(
    				branch.layer + 1,
    				{
    					x: branch.startPoint.x + branch.unitVector.x * branch.power * offset,
    					y: branch.startPoint.y + branch.unitVector.y * branch.power * offset
    				},
    				unitVector_c,
    				power2,
    				mag2,
    				lightness2
    			);

    			config.branches[newBranch.layer].push(newBranch);
    		}
    	}

    	function createRightBranch(config, branch, sideRight) {
    		for (let i = 0; i < sideRight; i++) {
    			var unitVector_c = toUnitVector(branch.unitVector.x - 0.6 + 0.3 * i * Math.random(), branch.unitVector.y);
    			var power2 = branch.power * (Math.random() * 0.1 + 0.8 / (branch.layer + 1));
    			var lightness2 = branch.lightness * 0.9;
    			var offset = 0.2 + 0.2 * i + 0.3 * Math.random();
    			var mag2 = branch.mag * (Math.random() * 0.1 + 0.7);

    			var newBranch = createBranch(
    				branch.layer + 1,
    				{
    					x: branch.startPoint.x + branch.unitVector.x * branch.power * offset,
    					y: branch.startPoint.y + branch.unitVector.y * branch.power * offset
    				},
    				unitVector_c,
    				power2,
    				mag2,
    				lightness2
    			);

    			config.branches[newBranch.layer].push(newBranch);
    		}
    	}

    	function handleMouseDown({ clientX, clientY }) {
    		mouse = [clientX, clientY];

    		if (config.length < Max && !(BenchRect.left - 50 <= mouse[0] && mouse[0] <= BenchRect.right + 50)) {
    			config.push(createTreeConfig());
    			config = config;
    		}
    	}

    	var hue = 360 * Math.random();

    	function drawLayer(branches, t, t_Max) {
    		for (let i = 0; i < branches.length; i++) {
    			ctx.strokeStyle = branches[i].grd;
    			ctx.beginPath();
    			ctx.moveTo(branches[i].startPoint.x, branches[i].startPoint.y);
    			ctx.lineTo(branches[i].startPoint.x + branches[i].power * branches[i].unitVector.x * t / t_Max, branches[i].startPoint.y + branches[i].power * branches[i].unitVector.y * t / t_Max);
    			ctx.lineWidth = branches[i].power / 25;
    			ctx.stroke();
    		} //            ctx.fill();
    	}

    	let t = 0;

    	function loop(onFrame) {
    		for (let i = 0; i < trees.length; i++) {
    			if (!trees[i].isDrawn) {
    				drawLayer(trees[i].config.branches[trees[i].config.DrawingLayer], trees[i].config.timer++, trees[i].config.MaximumTimer);

    				if (trees[i].config.timer == trees[i].config.MaximumTimer) {
    					trees[i].config.DrawingLayer++;
    					trees[i].config.timer = 0;
    				}

    				if (trees[i].config.DrawingLayer == trees[i].config.Layer) {
    					trees[i].isDrawn = true;
    				}
    			}
    		}

    		// var endDate = new Date();
    		// var duration = (endDate - startDate);
    		// avgTime += duration;
    		// frameCounter++;
    		requestAnimationFrame(loop);
    	}

    	onMount(async () => {
    		BenchRect = document.getElementsByClassName('Bench')[0].getBoundingClientRect();
    		ctx = canvas.getContext('2d');
    		ctx.lineCap = 'round';
    		loop();
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Park> was created with unknown prop '${key}'`);
    	});

    	function canvas_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			canvas = $$value;
    			$$invalidate(0, canvas);
    		});
    	}

    	$$self.$capture_state = () => ({
    		mdiConsoleNetwork,
    		mdiSourceBranchCheck,
    		onMount,
    		bench,
    		Device,
    		season,
    		defaultThickness,
    		smallest_mag,
    		mouse,
    		pmouse,
    		BenchRect,
    		config,
    		Max,
    		canvasWidth,
    		canvasHeight,
    		canvas,
    		ctx,
    		trees,
    		toUnitVector,
    		createBranch,
    		createTreeConfig,
    		createChildBranch,
    		createTopBranch,
    		createLeftBranch,
    		createRightBranch,
    		generateRandomInt,
    		handleMouseDown,
    		hue,
    		hsl,
    		drawLayer,
    		t,
    		loop,
    		$Device,
    		$bench
    	});

    	$$self.$inject_state = $$props => {
    		if ('smallest_mag' in $$props) smallest_mag = $$props.smallest_mag;
    		if ('mouse' in $$props) mouse = $$props.mouse;
    		if ('pmouse' in $$props) pmouse = $$props.pmouse;
    		if ('BenchRect' in $$props) BenchRect = $$props.BenchRect;
    		if ('config' in $$props) config = $$props.config;
    		if ('Max' in $$props) Max = $$props.Max;
    		if ('canvasWidth' in $$props) $$invalidate(2, canvasWidth = $$props.canvasWidth);
    		if ('canvasHeight' in $$props) $$invalidate(3, canvasHeight = $$props.canvasHeight);
    		if ('canvas' in $$props) $$invalidate(0, canvas = $$props.canvas);
    		if ('ctx' in $$props) ctx = $$props.ctx;
    		if ('trees' in $$props) trees = $$props.trees;
    		if ('hue' in $$props) hue = $$props.hue;
    		if ('t' in $$props) t = $$props.t;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [canvas, $bench, canvasWidth, canvasHeight, handleMouseDown, canvas_1_binding];
    }

    class Park extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$D, create_fragment$D, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Park",
    			options,
    			id: create_fragment$D.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\defaultSlide.svelte generated by Svelte v3.55.1 */

    const file$C = "src\\component\\PageDesign\\Slide\\defaultSlide.svelte";

    function create_fragment$C(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-1yq7emk");
    			add_location(div, file$C, 3, 0, 23);
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
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$C, create_fragment$C, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DefaultSlide",
    			options,
    			id: create_fragment$C.name
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

    const { console: console_1 } = globals;
    const file$B = "src\\component\\PageDesign\\DefaultPage.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[20] = list[i];
    	child_ctx[22] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[20] = list[i];
    	child_ctx[24] = i;
    	return child_ctx;
    }

    // (116:12) {#if id === cur}
    function create_if_block$5(ctx) {
    	let div;
    	let switch_instance;
    	let t_1;
    	let div_intro;
    	let div_outro;
    	let current;
    	var switch_value = /*slide*/ ctx[20].childComponent;

    	function switch_props(ctx) {
    		return {
    			props: { color: /*slide*/ ctx[20].color },
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
    			set_style(div, "background", /*slide*/ ctx[20].bg);
    			attr_dev(div, "class", "slide svelte-1s4xugr");
    			add_location(div, file$B, 116, 12, 3333);
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
    			if (dirty & /*slides*/ 1) switch_instance_changes.color = /*slide*/ ctx[20].color;

    			if (switch_value !== (switch_value = /*slide*/ ctx[20].childComponent)) {
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
    				set_style(div, "background", /*slide*/ ctx[20].bg);
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
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(116:12) {#if id === cur}",
    		ctx
    	});

    	return block;
    }

    // (115:8) {#each slides as slide, id}
    function create_each_block_1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*id*/ ctx[24] === /*cur*/ ctx[2] && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$5();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*id*/ ctx[24] === /*cur*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*cur*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
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
    		source: "(115:8) {#each slides as slide, id}",
    		ctx
    	});

    	return block;
    }

    // (130:12) {#each slides as slide, i}
    function create_each_block(ctx) {
    	let button;
    	let t_1_value = /*i*/ ctx[22] + 1 + "";
    	let t_1;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[10](/*i*/ ctx[22]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			t_1 = text(t_1_value);
    			attr_dev(button, "class", "dot svelte-1s4xugr");

    			set_style(button, "background", /*cur*/ ctx[2] == /*i*/ ctx[22]
    			? /*slide*/ ctx[20].buttonSelectedColor
    			: /*slide*/ ctx[20].buttonBackColor);

    			set_style(button, "border", "1px solid " + /*slide*/ ctx[20].buttonBorderColor);
    			toggle_class(button, "selected", /*cur*/ ctx[2] == /*i*/ ctx[22]);
    			add_location(button, file$B, 130, 16, 3808);
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

    			if (dirty & /*cur, slides*/ 5) {
    				set_style(button, "background", /*cur*/ ctx[2] == /*i*/ ctx[22]
    				? /*slide*/ ctx[20].buttonSelectedColor
    				: /*slide*/ ctx[20].buttonBackColor);
    			}

    			if (dirty & /*slides*/ 1) {
    				set_style(button, "border", "1px solid " + /*slide*/ ctx[20].buttonBorderColor);
    			}

    			if (dirty & /*cur*/ 4) {
    				toggle_class(button, "selected", /*cur*/ ctx[2] == /*i*/ ctx[22]);
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
    		source: "(130:12) {#each slides as slide, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$B(ctx) {
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

    			attr_dev(div0, "class", "inner-wrapper svelte-1s4xugr");
    			add_location(div0, file$B, 113, 4, 3201);
    			attr_dev(div1, "class", "dots svelte-1s4xugr");
    			add_location(div1, file$B, 128, 8, 3732);
    			attr_dev(div2, "class", "footer svelte-1s4xugr");
    			add_location(div2, file$B, 127, 4, 3702);
    			attr_dev(div3, "class", "Page svelte-1s4xugr");
    			set_style(div3, "background", /*background*/ ctx[1][/*$season*/ ctx[3]]);
    			add_location(div3, file$B, 112, 0, 3131);
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
    				dispose = [
    					listen_dev(window, "touchstart", /*touchStart*/ ctx[6], false, false, false),
    					listen_dev(window, "touchend", /*touchEnd*/ ctx[8], false, false, false),
    					listen_dev(window, "touchmove", /*touchMove*/ ctx[7], false, false, false),
    					listen_dev(window, "mousedown", /*touchStart*/ ctx[6], false, false, false),
    					listen_dev(window, "mouseup", /*touchEnd*/ ctx[8], false, false, false),
    					listen_dev(window, "mouseleave", /*touchEnd*/ ctx[8], false, false, false),
    					listen_dev(window, "mousemove", /*touchMove*/ ctx[7], false, false, false),
    					listen_dev(div0, "mousewheel", /*onWheel*/ ctx[9], false, false, false)
    				];

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

    			if (dirty & /*cur, slides, changeSlide*/ 21) {
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
    			run_all(dispose);
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

    function getPositionX(event) {
    	return event.type.includes('mouse')
    	? event.pageX
    	: event.touches[0].clientX;
    }

    function instance$B($$self, $$props, $$invalidate) {
    	let $LastPage;
    	let $season;
    	validate_store(LastPage, 'LastPage');
    	component_subscribe($$self, LastPage, $$value => $$invalidate(16, $LastPage = $$value));
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
    			color: '#fff',
    			buttonBackColor: "#000",
    			buttonBorderColor: "#fff",
    			buttonSelectedColor: "#000"
    		},
    		{
    			childComponent: DefaultSlide,
    			bg: 'transparent',
    			color: '#fff',
    			buttonBackColor: "#000",
    			buttonBorderColor: "#fff",
    			buttonSelectedColor: "#000"
    		},
    		{
    			childComponent: DefaultSlide,
    			bg: 'transparent',
    			color: '#fff',
    			buttonBackColor: "#000",
    			buttonBorderColor: "#fff",
    			buttonSelectedColor: "#000"
    		},
    		{
    			childComponent: DefaultSlide,
    			bg: 'transparent',
    			color: '#fff',
    			buttonBackColor: "#000",
    			buttonBorderColor: "#fff",
    			buttonSelectedColor: "#000"
    		}
    	] } = $$props;

    	let cur = $LastPage["WindowResized"] == true
    	? $LastPage["Index"]
    	: 0;

    	let t;
    	let enbleToMove = true;
    	let drawComponent = true;
    	let isDragging = false;
    	let mouseDownLocation = 0;
    	let mouseLocation = 0;
    	set_store_value(LastPage, $LastPage["WindowResized"] = false, $LastPage);
    	const transition_args = { duration: 200 };

    	function prev(e) {
    		$$invalidate(2, cur = $$invalidate(2, --cur) >= 0 ? cur : slides.length - 1);
    		set_store_value(LastPage, $LastPage["Index"] = cur, $LastPage);
    	}

    	function next(e) {
    		$$invalidate(2, cur = $$invalidate(2, ++cur) % slides.length);
    		set_store_value(LastPage, $LastPage["Index"] = cur, $LastPage);
    	}

    	function touchStart(e) {
    		mouseLocation = mouseDownLocation = getPositionX(e);
    		isDragging = true;
    	}

    	function touchMove(e) {
    		if (isDragging) {
    			mouseLocation = getPositionX(e);
    		}
    	}

    	function touchEnd(e) {
    		if (isDragging) {
    			isDragging = false;
    			const movedBy = mouseLocation - mouseDownLocation;
    			console.log(mouseLocation);
    			console.log(mouseDownLocation);
    			if (movedBy < -100) next(); else if (movedBy > 100) prev();
    		}
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
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<DefaultPage> was created with unknown prop '${key}'`);
    	});

    	const click_handler = i => changeSlide(i);

    	$$self.$$set = $$props => {
    		if ('slides' in $$props) $$invalidate(0, slides = $$props.slides);
    	};

    	$$self.$capture_state = () => ({
    		DefaultSlide,
    		hslide,
    		Device,
    		LastPage,
    		season,
    		onMount,
    		mdiRayEndArrow,
    		background,
    		changeSlide,
    		slides,
    		cur,
    		t,
    		enbleToMove,
    		drawComponent,
    		isDragging,
    		mouseDownLocation,
    		mouseLocation,
    		transition_args,
    		prev,
    		next,
    		touchStart,
    		touchMove,
    		touchEnd,
    		getPositionX,
    		onWheel,
    		$LastPage,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('background' in $$props) $$invalidate(1, background = $$props.background);
    		if ('slides' in $$props) $$invalidate(0, slides = $$props.slides);
    		if ('cur' in $$props) $$invalidate(2, cur = $$props.cur);
    		if ('t' in $$props) t = $$props.t;
    		if ('enbleToMove' in $$props) enbleToMove = $$props.enbleToMove;
    		if ('drawComponent' in $$props) drawComponent = $$props.drawComponent;
    		if ('isDragging' in $$props) isDragging = $$props.isDragging;
    		if ('mouseDownLocation' in $$props) mouseDownLocation = $$props.mouseDownLocation;
    		if ('mouseLocation' in $$props) mouseLocation = $$props.mouseLocation;
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
    		touchStart,
    		touchMove,
    		touchEnd,
    		onWheel,
    		click_handler
    	];
    }

    class DefaultPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$B, create_fragment$B, safe_not_equal, { slides: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DefaultPage",
    			options,
    			id: create_fragment$B.name
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
    const file$A = "src\\component\\PageDesign\\Slide\\Main\\Slide01.svelte";

    // (65:27) 
    function create_if_block_1$2(ctx) {
    	let div2;
    	let div0;
    	let t1;
    	let div1;
    	let div2_intro;
    	let current;
    	let if_block = /*visibility*/ ctx[4] && create_if_block_2$1(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "드래그를 통해 슬라이드를 이동해 보세요.";
    			t1 = space();
    			div1 = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "header svelte-ltys30");
    			set_style(div0, "height", "20%");
    			add_location(div0, file$A, 66, 16, 2049);
    			attr_dev(div1, "class", "howToMove svelte-ltys30");
    			set_style(div1, "left", -/*calcMainFontSize*/ ctx[7]() / 2 + "rem");
    			add_location(div1, file$A, 69, 16, 2175);
    			attr_dev(div2, "class", "Section svelte-ltys30");
    			set_style(div2, "height", "100%");
    			set_style(div2, "width", "100%");
    			set_style(div2, "font-size", /*calcSubFontSize*/ ctx[8]() + "rem");
    			add_location(div2, file$A, 65, 12, 1907);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			if (if_block) if_block.m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*visibility*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*visibility*/ 16) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_2$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
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

    			if (!div2_intro) {
    				add_render_callback(() => {
    					div2_intro = create_in_transition(div2, fade, { delay: 300, duration: 200 });
    					div2_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(65:27) ",
    		ctx
    	});

    	return block;
    }

    // (63:8) {#if Slide_01}
    function create_if_block$4(ctx) {
    	let p;
    	let p_outro;
    	let current;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Welcome to abcBank";
    			add_location(p, file$A, 63, 12, 1812);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			if (p_outro) p_outro.end(1);
    			current = true;
    		},
    		o: function outro(local) {
    			p_outro = create_out_transition(p, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching && p_outro) p_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(63:8) {#if Slide_01}",
    		ctx
    	});

    	return block;
    }

    // (71:20) {#if visibility}
    function create_if_block_2$1(ctx) {
    	let div;
    	let icon;
    	let div_intro;
    	let div_outro;
    	let current;

    	icon = new Icon({
    			props: {
    				size: /*calcMainFontSize*/ ctx[7]().toString() + "rem",
    				color: /*$Color*/ ctx[5]["foreColor"][/*$season*/ ctx[6]],
    				path: mdiCursorDefaultClick
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(icon.$$.fragment);
    			attr_dev(div, "class", "animation svelte-ltys30");
    			set_style(div, "left", (!/*animationStart*/ ctx[3] ? 75 : 25) + "%");
    			add_location(div, file$A, 71, 20, 2300);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(icon, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_changes = {};
    			if (dirty & /*$Color, $season*/ 96) icon_changes.color = /*$Color*/ ctx[5]["foreColor"][/*$season*/ ctx[6]];
    			icon.$set(icon_changes);

    			if (!current || dirty & /*animationStart*/ 8) {
    				set_style(div, "left", (!/*animationStart*/ ctx[3] ? 75 : 25) + "%");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, { duration: 200 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(icon);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(71:20) {#if visibility}",
    		ctx
    	});

    	return block;
    }

    // (61:0) <DefaultSlide>
    function create_default_slot$n(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$4, create_if_block_1$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*Slide_01*/ ctx[1]) return 0;
    		if (/*Slide_02*/ ctx[2]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "context svelte-ltys30");
    			set_style(div, "color", /*color*/ ctx[0]);
    			set_style(div, "font-size", /*calcMainFontSize*/ ctx[7]() + "rem");
    			add_location(div, file$A, 61, 4, 1695);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				} else {
    					if_block = null;
    				}
    			}

    			if (!current || dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
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
    			if (detaching) detach_dev(div);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$n.name,
    		type: "slot",
    		source: "(61:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$A(ctx) {
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

    			if (dirty & /*$$scope, color, Slide_01, animationStart, $Color, $season, visibility, Slide_02*/ 131199) {
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
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	let $Device;
    	let $Color;
    	let $season;
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(10, $Device = $$value));
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(5, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(6, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide01', slots, []);
    	let { color } = $$props;
    	let Cur = false;
    	let Slide_01 = true;
    	let Slide_02 = false;
    	let animationStart = false;
    	let visibility = true;
    	let isOpen = true;
    	let t;
    	const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    	const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;

    	function startSlideChangeTimer() {
    		clearTimeout(t);

    		t = setTimeout(
    			() => {
    				$$invalidate(1, Slide_01 = false);
    				clearTimeout(t);

    				t = setTimeout(
    					() => {
    						$$invalidate(2, Slide_02 = true);
    						startAnimationTimer();
    					},
    					300
    				);
    			},
    			1000
    		);
    	}

    	function startAnimationTimer() {
    		clearTimeout(t);
    		$$invalidate(4, visibility = true);

    		t = setTimeout(
    			() => {
    				$$invalidate(3, animationStart = true);
    				animationFinished();
    			},
    			2000
    		);
    	}

    	function animationFinished() {
    		clearTimeout(t);

    		t = setTimeout(
    			() => {
    				restartAnimation();
    			},
    			2500
    		);
    	}

    	function restartAnimation() {
    		$$invalidate(4, visibility = false);
    		$$invalidate(3, animationStart = false);
    		clearTimeout(t);

    		t = setTimeout(
    			() => {
    				startAnimationTimer();
    			},
    			1500
    		);
    	}

    	onMount(() => {
    		$$invalidate(1, Slide_01 = true);
    		$$invalidate(2, Slide_02 = false);
    		startSlideChangeTimer();
    	});

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

    	$$self.$capture_state = () => ({
    		Device,
    		Color,
    		season,
    		DefaultSlide,
    		Icon,
    		onMount,
    		fade,
    		mdiCursorDefaultClick,
    		color,
    		Cur,
    		Slide_01,
    		Slide_02,
    		animationStart,
    		visibility,
    		isOpen,
    		t,
    		calcMainFontSize,
    		calcSubFontSize,
    		startSlideChangeTimer,
    		startAnimationTimer,
    		animationFinished,
    		restartAnimation,
    		$Device,
    		$Color,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('Cur' in $$props) Cur = $$props.Cur;
    		if ('Slide_01' in $$props) $$invalidate(1, Slide_01 = $$props.Slide_01);
    		if ('Slide_02' in $$props) $$invalidate(2, Slide_02 = $$props.Slide_02);
    		if ('animationStart' in $$props) $$invalidate(3, animationStart = $$props.animationStart);
    		if ('visibility' in $$props) $$invalidate(4, visibility = $$props.visibility);
    		if ('isOpen' in $$props) isOpen = $$props.isOpen;
    		if ('t' in $$props) t = $$props.t;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		color,
    		Slide_01,
    		Slide_02,
    		animationStart,
    		visibility,
    		$Color,
    		$season,
    		calcMainFontSize,
    		calcSubFontSize
    	];
    }

    class Slide01$4 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$A.name
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
    const file$z = "src\\component\\PageDesign\\Slide\\Main\\Slide02.svelte";

    // (67:27) 
    function create_if_block_1$1(ctx) {
    	let div1;
    	let div0;
    	let t_1;
    	let div1_intro;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t_1 = text("마우스를 쓸 경우, 휠을 통해서도 이동이 가능하답니다.");
    			attr_dev(div0, "class", "header svelte-1t6wt2e");
    			set_style(div0, "height", "20%");
    			set_style(div0, "font-size", /*calcSubFontSize*/ ctx[4]() + "rem");
    			add_location(div0, file$z, 68, 16, 2101);
    			attr_dev(div1, "class", "Section svelte-1t6wt2e");
    			set_style(div1, "height", "100%");
    			set_style(div1, "width", "100%");
    			add_location(div1, file$z, 67, 12, 1993);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t_1);
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!div1_intro) {
    				add_render_callback(() => {
    					div1_intro = create_in_transition(div1, fade, { delay: 300, duration: 200 });
    					div1_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(67:27) ",
    		ctx
    	});

    	return block;
    }

    // (65:8) {#if Slide_01}
    function create_if_block$3(ctx) {
    	let p;
    	let p_outro;
    	let current;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "잘 하셨습니다!";
    			add_location(p, file$z, 65, 12, 1908);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			if (p_outro) p_outro.end(1);
    			current = true;
    		},
    		o: function outro(local) {
    			p_outro = create_out_transition(p, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching && p_outro) p_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(65:8) {#if Slide_01}",
    		ctx
    	});

    	return block;
    }

    // (63:0) <DefaultSlide>
    function create_default_slot$m(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$3, create_if_block_1$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*Slide_01*/ ctx[1]) return 0;
    		if (/*Slide_02*/ ctx[2]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "context svelte-1t6wt2e");
    			set_style(div, "color", /*color*/ ctx[0]);
    			set_style(div, "font-size", /*calcMainFontSize*/ ctx[3]() + "rem");
    			add_location(div, file$z, 63, 4, 1791);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				} else {
    					if_block = null;
    				}
    			}

    			if (!current || dirty & /*color*/ 1) {
    				set_style(div, "color", /*color*/ ctx[0]);
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
    			if (detaching) detach_dev(div);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$m.name,
    		type: "slot",
    		source: "(63:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$z(ctx) {
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

    			if (dirty & /*$$scope, color, Slide_01, Slide_02*/ 32775) {
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
    	let $Device;
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(8, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide02', slots, []);
    	let { color } = $$props;
    	let Cur = false;
    	let Slide_01 = true;
    	let Slide_02 = false;
    	let animationStart = false;
    	let visibility = true;
    	let isOpen = true;
    	let t;
    	const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    	const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 0.8;

    	function startSlideChangeTimer() {
    		clearTimeout(t);

    		t = setTimeout(
    			() => {
    				$$invalidate(1, Slide_01 = false);
    				clearTimeout(t);

    				t = setTimeout(
    					() => {
    						$$invalidate(2, Slide_02 = true);
    						startAnimationTimer();
    					},
    					300
    				);
    			},
    			1000
    		);
    	}

    	function startAnimationTimer() {
    		clearTimeout(t);
    		visibility = true;

    		t = setTimeout(
    			() => {
    				animationStart = true;
    				animationFinished();
    			},
    			2000
    		);
    	}

    	function animationFinished() {
    		clearTimeout(t);

    		t = setTimeout(
    			() => {
    				restartAnimation();
    			},
    			2500
    		);
    	}

    	function restartAnimation() {
    		visibility = false;
    		animationStart = false;
    		clearTimeout(t);

    		t = setTimeout(
    			() => {
    				startAnimationTimer();
    			},
    			1500
    		);
    	}

    	onMount(() => {
    		$$invalidate(1, Slide_01 = true);
    		$$invalidate(2, Slide_02 = false);
    		startSlideChangeTimer();
    	});

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

    	$$self.$capture_state = () => ({
    		Tooltip,
    		Device,
    		DefaultSlide,
    		Icon,
    		onMount,
    		fade,
    		mdiCursorDefaultClick,
    		IconButton,
    		color,
    		Cur,
    		Slide_01,
    		Slide_02,
    		animationStart,
    		visibility,
    		isOpen,
    		t,
    		calcMainFontSize,
    		calcSubFontSize,
    		startSlideChangeTimer,
    		startAnimationTimer,
    		animationFinished,
    		restartAnimation,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('Cur' in $$props) Cur = $$props.Cur;
    		if ('Slide_01' in $$props) $$invalidate(1, Slide_01 = $$props.Slide_01);
    		if ('Slide_02' in $$props) $$invalidate(2, Slide_02 = $$props.Slide_02);
    		if ('animationStart' in $$props) animationStart = $$props.animationStart;
    		if ('visibility' in $$props) visibility = $$props.visibility;
    		if ('isOpen' in $$props) isOpen = $$props.isOpen;
    		if ('t' in $$props) t = $$props.t;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, Slide_01, Slide_02, calcMainFontSize, calcSubFontSize];
    }

    class Slide02$4 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$z.name
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
    const file$y = "src\\component\\PageDesign\\Slide\\Main\\Slide03.svelte";

    // (12:0) <DefaultSlide>
    function create_default_slot$l(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let icon;
    	let div1_intro;
    	let current;

    	icon = new Icon({
    			props: {
    				size: "60px",
    				color: /*$Color*/ ctx[1]["foreColor"][/*$season*/ ctx[2]],
    				path: mdiArrowDownBoldOutline
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text("당연히, 아래 버튼을 통해서도 가능하구요.");
    			t1 = space();
    			div1 = element("div");
    			create_component(icon.$$.fragment);
    			attr_dev(div0, "class", "header svelte-1mtw4dq");
    			set_style(div0, "width", "100%");
    			set_style(div0, "height", "100%");
    			set_style(div0, "font-size", /*calcSubFontSize*/ ctx[3]() + "rem");
    			add_location(div0, file$y, 13, 8, 462);
    			attr_dev(div1, "class", "footer svelte-1mtw4dq");
    			set_style(div1, "width", "100%");
    			set_style(div1, "height", "70px");
    			add_location(div1, file$y, 16, 8, 612);
    			attr_dev(div2, "class", "context svelte-1mtw4dq");
    			set_style(div2, "color", /*color*/ ctx[0]);
    			add_location(div2, file$y, 12, 4, 408);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			mount_component(icon, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_changes = {};
    			if (dirty & /*$Color, $season*/ 6) icon_changes.color = /*$Color*/ ctx[1]["foreColor"][/*$season*/ ctx[2]];
    			icon.$set(icon_changes);

    			if (!current || dirty & /*color*/ 1) {
    				set_style(div2, "color", /*color*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);

    			if (!div1_intro) {
    				add_render_callback(() => {
    					div1_intro = create_in_transition(div1, fade, { delay: 200, duration: 200 });
    					div1_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$l.name,
    		type: "slot",
    		source: "(12:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$y(ctx) {
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

    			if (dirty & /*$$scope, color, $Color, $season*/ 39) {
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
    	let $Device;
    	let $Color;
    	let $season;
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(4, $Device = $$value));
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(1, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(2, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide03', slots, []);
    	let { color } = $$props;
    	const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;

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

    	$$self.$capture_state = () => ({
    		Icon,
    		fade,
    		Device,
    		Color,
    		season,
    		DefaultSlide,
    		mdiArrowDownBoldOutline,
    		color,
    		calcSubFontSize,
    		$Device,
    		$Color,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, $Color, $season, calcSubFontSize];
    }

    class Slide03$4 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$y, create_fragment$y, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$y.name
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
    const file$x = "src\\component\\PageDesign\\Slide\\Main\\Slide04.svelte";

    // (51:16) {#if visibility}
    function create_if_block$2(ctx) {
    	let div;
    	let icon;
    	let div_intro;
    	let div_outro;
    	let current;

    	icon = new Icon({
    			props: {
    				size: /*calcMainFontSize*/ ctx[5]().toString() + "rem",
    				color: /*$Color*/ ctx[3]["foreColor"][/*$season*/ ctx[4]],
    				path: mdiCursorDefaultClick
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(icon.$$.fragment);
    			attr_dev(div, "class", "animation svelte-1nby8tr");
    			set_style(div, "left", (!/*animationStart*/ ctx[1] ? 25 : 75) + "%");
    			add_location(div, file$x, 51, 16, 1613);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(icon, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_changes = {};
    			if (dirty & /*$Color, $season*/ 24) icon_changes.color = /*$Color*/ ctx[3]["foreColor"][/*$season*/ ctx[4]];
    			icon.$set(icon_changes);

    			if (!current || dirty & /*animationStart*/ 2) {
    				set_style(div, "left", (!/*animationStart*/ ctx[1] ? 25 : 75) + "%");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, { duration: 200 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(icon);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(51:16) {#if visibility}",
    		ctx
    	});

    	return block;
    }

    // (44:0) <DefaultSlide>
    function create_default_slot$k(ctx) {
    	let div3;
    	let div2;
    	let div0;
    	let t1;
    	let div1;
    	let current;
    	let if_block = /*visibility*/ ctx[2] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "물론, 이전 페이지도 볼 수 있겠죠?";
    			t1 = space();
    			div1 = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "header svelte-1nby8tr");
    			set_style(div0, "height", "20%");
    			add_location(div0, file$x, 46, 12, 1384);
    			attr_dev(div1, "class", "howToMove svelte-1nby8tr");
    			set_style(div1, "left", -/*calcMainFontSize*/ ctx[5]() / 2 + "rem");
    			add_location(div1, file$x, 49, 12, 1496);
    			attr_dev(div2, "class", "Section svelte-1nby8tr");
    			set_style(div2, "height", "100%");
    			set_style(div2, "width", "100%");
    			add_location(div2, file$x, 45, 8, 1316);
    			attr_dev(div3, "class", "context svelte-1nby8tr");
    			set_style(div3, "color", /*color*/ ctx[0]);
    			set_style(div3, "font-size", /*calcSubFontSize*/ ctx[6]() + "rem");
    			add_location(div3, file$x, 44, 4, 1228);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			if (if_block) if_block.m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*visibility*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*visibility*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*color*/ 1) {
    				set_style(div3, "color", /*color*/ ctx[0]);
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
    			if (detaching) detach_dev(div3);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$k.name,
    		type: "slot",
    		source: "(44:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$x(ctx) {
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

    			if (dirty & /*$$scope, color, animationStart, $Color, $season, visibility*/ 4127) {
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
    	let $Device;
    	let $Color;
    	let $season;
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(8, $Device = $$value));
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(3, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(4, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide04', slots, []);
    	let { color } = $$props;
    	let animationStart = false;
    	let visibility = true;
    	let t;
    	const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    	const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;

    	function startAnimationTimer() {
    		clearTimeout(t);
    		$$invalidate(2, visibility = true);

    		t = setTimeout(
    			() => {
    				$$invalidate(1, animationStart = true);
    				animationFinished();
    			},
    			2000
    		);
    	}

    	function animationFinished() {
    		clearTimeout(t);

    		t = setTimeout(
    			() => {
    				restartAnimation();
    			},
    			2500
    		);
    	}

    	function restartAnimation() {
    		$$invalidate(2, visibility = false);
    		$$invalidate(1, animationStart = false);
    		clearTimeout(t);

    		t = setTimeout(
    			() => {
    				startAnimationTimer();
    			},
    			1500
    		);
    	}

    	onMount(() => {
    		startAnimationTimer();
    	});

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

    	$$self.$capture_state = () => ({
    		Device,
    		Color,
    		season,
    		DefaultSlide,
    		Icon,
    		onMount,
    		fade,
    		mdiCursorDefaultClick,
    		color,
    		animationStart,
    		visibility,
    		t,
    		calcMainFontSize,
    		calcSubFontSize,
    		startAnimationTimer,
    		animationFinished,
    		restartAnimation,
    		$Device,
    		$Color,
    		$season
    	});

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('animationStart' in $$props) $$invalidate(1, animationStart = $$props.animationStart);
    		if ('visibility' in $$props) $$invalidate(2, visibility = $$props.visibility);
    		if ('t' in $$props) t = $$props.t;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		color,
    		animationStart,
    		visibility,
    		$Color,
    		$season,
    		calcMainFontSize,
    		calcSubFontSize
    	];
    }

    class Slide04$4 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$x, create_fragment$x, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$x.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide04>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide04>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Main\Slide05.svelte generated by Svelte v3.55.1 */
    const file$w = "src\\component\\PageDesign\\Slide\\Main\\Slide05.svelte";

    // (9:0) <DefaultSlide>
    function create_default_slot$j(ctx) {
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "이제 제 포트폴리오를 보실 준비가 되셨네요!";
    			attr_dev(div0, "class", "header svelte-1mtw4dq");
    			set_style(div0, "width", "100%");
    			set_style(div0, "height", "100%");
    			add_location(div0, file$w, 10, 8, 325);
    			attr_dev(div1, "class", "context svelte-1mtw4dq");
    			set_style(div1, "color", /*color*/ ctx[0]);
    			set_style(div1, "font-size", /*calcSubFontSize*/ ctx[1]() + "rem");
    			add_location(div1, file$w, 9, 4, 237);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div1, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$j.name,
    		type: "slot",
    		source: "(9:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$w(ctx) {
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

    			if (dirty & /*$$scope, color*/ 9) {
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
    	let $Device;
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(2, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide05', slots, []);
    	let { color } = $$props;
    	const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide05> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide05> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({
    		Device,
    		DefaultSlide,
    		color,
    		calcSubFontSize,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, calcSubFontSize];
    }

    class Slide05 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide05",
    			options,
    			id: create_fragment$w.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide05>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide05>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Main\Slide06.svelte generated by Svelte v3.55.1 */
    const file$v = "src\\component\\PageDesign\\Slide\\Main\\Slide06.svelte";

    // (9:0) <DefaultSlide>
    function create_default_slot$i(ctx) {
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "제 주력 분야가 웹과 디자인이 아니지만...";
    			attr_dev(div0, "class", "header svelte-1mtw4dq");
    			set_style(div0, "width", "100%");
    			set_style(div0, "height", "100%");
    			add_location(div0, file$v, 10, 8, 325);
    			attr_dev(div1, "class", "context svelte-1mtw4dq");
    			set_style(div1, "color", /*color*/ ctx[0]);
    			set_style(div1, "font-size", /*calcSubFontSize*/ ctx[1]() + "rem");
    			add_location(div1, file$v, 9, 4, 237);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div1, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$i.name,
    		type: "slot",
    		source: "(9:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$v(ctx) {
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

    			if (dirty & /*$$scope, color*/ 9) {
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
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let $Device;
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(2, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide06', slots, []);
    	let { color } = $$props;
    	const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide06> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide06> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({
    		Device,
    		DefaultSlide,
    		color,
    		calcSubFontSize,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, calcSubFontSize];
    }

    class Slide06 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide06",
    			options,
    			id: create_fragment$v.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide06>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide06>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Main\Slide07.svelte generated by Svelte v3.55.1 */
    const file$u = "src\\component\\PageDesign\\Slide\\Main\\Slide07.svelte";

    // (9:0) <DefaultSlide>
    function create_default_slot$h(ctx) {
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "얼마 없는 감각으로 나름 열심히 꾸며 봤답니다.";
    			attr_dev(div0, "class", "header svelte-1mtw4dq");
    			set_style(div0, "width", "100%");
    			set_style(div0, "height", "100%");
    			add_location(div0, file$u, 10, 8, 329);
    			attr_dev(div1, "class", "context svelte-1mtw4dq");
    			set_style(div1, "color", /*color*/ ctx[0]);
    			set_style(div1, "font-size", /*calcSubFontSize*/ ctx[1]() + "rem");
    			add_location(div1, file$u, 9, 4, 241);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div1, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$h.name,
    		type: "slot",
    		source: "(9:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$u(ctx) {
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

    			if (dirty & /*$$scope, color*/ 9) {
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
    	let $Device;
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(2, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide07', slots, []);
    	let { color } = $$props;
    	const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide07> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide07> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({
    		Device,
    		DefaultSlide,
    		color,
    		calcSubFontSize,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, calcSubFontSize];
    }

    class Slide07 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$u, create_fragment$u, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide07",
    			options,
    			id: create_fragment$u.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide07>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide07>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\Main\Slide08.svelte generated by Svelte v3.55.1 */
    const file$t = "src\\component\\PageDesign\\Slide\\Main\\Slide08.svelte";

    // (8:0) <DefaultSlide>
    function create_default_slot$g(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let br;
    	let t1;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text("다만 일부 배경의 경우, 컴퓨터 사양에 따라\r\n            ");
    			br = element("br");
    			t1 = text("\r\n            렉이 걸릴 수 있으니 유의해주세요.");
    			add_location(br, file$t, 11, 12, 428);
    			attr_dev(div0, "class", "header svelte-1mtw4dq");
    			set_style(div0, "width", "100%");
    			set_style(div0, "height", "100%");
    			add_location(div0, file$t, 9, 8, 323);
    			attr_dev(div1, "class", "context svelte-1mtw4dq");
    			set_style(div1, "color", /*color*/ ctx[0]);
    			set_style(div1, "font-size", /*calcSubFontSize*/ ctx[1]() + "rem");
    			add_location(div1, file$t, 8, 4, 235);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div0, br);
    			append_dev(div0, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div1, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$g.name,
    		type: "slot",
    		source: "(8:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$t(ctx) {
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

    			if (dirty & /*$$scope, color*/ 9) {
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
    	let $Device;
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(2, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide08', slots, []);
    	let { color } = $$props;
    	const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Slide08> was created without expected prop 'color'");
    		}
    	});

    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slide08> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({
    		Device,
    		DefaultSlide,
    		color,
    		calcSubFontSize,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, calcSubFontSize];
    }

    class Slide08 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$t, create_fragment$t, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide08",
    			options,
    			id: create_fragment$t.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide08>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide08>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\routes\Main.svelte generated by Svelte v3.55.1 */
    const file$s = "src\\component\\routes\\Main.svelte";

    function create_fragment$s(ctx) {
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
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02$4,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03$4,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04$4,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide05,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide06,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide07,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide08,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$s, 14, 0, 717);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$4,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02$4,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03$4,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04$4,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide05,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide06,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide07,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide08,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		DefaultPage,
    		Slide01: Slide01$4,
    		Slide02: Slide02$4,
    		Slide03: Slide03$4,
    		Slide04: Slide04$4,
    		Slide05,
    		Slide06,
    		Slide07,
    		Slide08,
    		fade,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main",
    			options,
    			id: create_fragment$s.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\Profile\Slide01.svelte generated by Svelte v3.55.1 */
    const file$r = "src\\component\\PageDesign\\Slide\\Profile\\Slide01.svelte";

    // (7:0) <DefaultSlide>
    function create_default_slot$f(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Profile Slide 01";
    			add_location(p, file$r, 8, 8, 227);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$r, 7, 4, 173);
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
    		source: "(7:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
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
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
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

    	$$self.$capture_state = () => ({ DefaultSlide, Device, color });

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
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$r.name
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
    const file$q = "src\\component\\PageDesign\\Slide\\Profile\\Slide02.svelte";

    // (7:0) <DefaultSlide>
    function create_default_slot$e(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Profile Slide 02";
    			add_location(p, file$q, 8, 8, 227);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$q, 7, 4, 173);
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
    		source: "(7:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
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
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
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

    	$$self.$capture_state = () => ({ DefaultSlide, Device, color });

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
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$q.name
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
    const file$p = "src\\component\\PageDesign\\Slide\\Profile\\Slide03.svelte";

    // (7:0) <DefaultSlide>
    function create_default_slot$d(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Profile Slide 03";
    			add_location(p, file$p, 8, 8, 227);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$p, 7, 4, 173);
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
    		source: "(7:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
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
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
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

    	$$self.$capture_state = () => ({ DefaultSlide, Device, color });

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
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$p.name
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
    const file$o = "src\\component\\PageDesign\\Slide\\Profile\\Slide04.svelte";

    // (7:0) <DefaultSlide>
    function create_default_slot$c(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Profile Slide 04";
    			add_location(p, file$o, 8, 8, 227);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$o, 7, 4, 173);
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
    		source: "(7:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
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
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
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

    	$$self.$capture_state = () => ({ DefaultSlide, Device, color });

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
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$o.name
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
    const file$n = "src\\component\\routes\\Profile.svelte";

    function create_fragment$n(ctx) {
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
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02$3,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03$3,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04$3,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$n, 10, 0, 461);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$3,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02$3,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03$3,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04$3,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Profile', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Profile> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		fade,
    		DefaultPage,
    		Slide01: Slide01$3,
    		Slide02: Slide02$3,
    		Slide03: Slide03$3,
    		Slide04: Slide04$3,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class Profile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Profile",
    			options,
    			id: create_fragment$n.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\Projects\Slide01.svelte generated by Svelte v3.55.1 */
    const file$m = "src\\component\\PageDesign\\Slide\\Projects\\Slide01.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$b(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Project Slide 01";
    			add_location(p, file$m, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$m, 6, 4, 121);
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

    function create_fragment$m(ctx) {
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
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$m.name
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
    const file$l = "src\\component\\PageDesign\\Slide\\Projects\\Slide02.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$a(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Project Slide 02";
    			add_location(p, file$l, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$l, 6, 4, 121);
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

    function create_fragment$l(ctx) {
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
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$l.name
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
    const file$k = "src\\component\\PageDesign\\Slide\\Projects\\Slide03.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$9(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Project Slide 03";
    			add_location(p, file$k, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$k, 6, 4, 121);
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

    function create_fragment$k(ctx) {
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
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$k.name
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
    const file$j = "src\\component\\PageDesign\\Slide\\Projects\\Slide04.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$8(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Project Slide 04";
    			add_location(p, file$j, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$j, 6, 4, 121);
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

    function create_fragment$j(ctx) {
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
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$j.name
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
    const file$i = "src\\component\\routes\\Projects.svelte";

    function create_fragment$i(ctx) {
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
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02$2,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03$2,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04$2,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$i, 10, 0, 465);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$2,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02$2,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03$2,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04$2,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		DefaultPage,
    		Slide01: Slide01$2,
    		Slide02: Slide02$2,
    		Slide03: Slide03$2,
    		Slide04: Slide04$2,
    		fade,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\Outsourcing\Slide01.svelte generated by Svelte v3.55.1 */
    const file$h = "src\\component\\PageDesign\\Slide\\Outsourcing\\Slide01.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$7(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Outsourcing Slide 01";
    			add_location(p, file$h, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$h, 6, 4, 121);
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

    function create_fragment$h(ctx) {
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
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$h.name
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
    const file$g = "src\\component\\PageDesign\\Slide\\Outsourcing\\Slide02.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$6(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Outsourcing Slide 02";
    			add_location(p, file$g, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$g, 6, 4, 121);
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

    function create_fragment$g(ctx) {
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
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$g.name
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
    const file$f = "src\\component\\PageDesign\\Slide\\Outsourcing\\Slide03.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$5(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Outsourcing Slide 03";
    			add_location(p, file$f, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$f, 6, 4, 121);
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

    function create_fragment$f(ctx) {
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
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$f.name
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
    const file$e = "src\\component\\PageDesign\\Slide\\Outsourcing\\Slide04.svelte";

    // (6:0) <DefaultSlide>
    function create_default_slot$4(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Outsourcing Slide 04";
    			add_location(p, file$e, 7, 8, 175);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$e, 6, 4, 121);
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

    function create_fragment$e(ctx) {
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
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$e.name
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
    const file$d = "src\\component\\routes\\Outsourcing.svelte";

    function create_fragment$d(ctx) {
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
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02$1,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03$1,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04$1,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$d, 9, 0, 474);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01$1,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02$1,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03$1,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04$1,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Outsourcing', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Outsourcing> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		DefaultPage,
    		Slide01: Slide01$1,
    		Slide02: Slide02$1,
    		Slide03: Slide03$1,
    		Slide04: Slide04$1,
    		fade,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class Outsourcing extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Outsourcing",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src\component\PageDesign\Slide\2022\Outsourcing\Picam\Slide01.svelte generated by Svelte v3.55.1 */
    const file$c = "src\\component\\PageDesign\\Slide\\2022\\Outsourcing\\Picam\\Slide01.svelte";

    // (12:4) {#if !$Device["isMobile"]}
    function create_if_block$1(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Picamera Server";
    			add_location(p, file$c, 13, 8, 457);
    			attr_dev(div, "class", "context svelte-1sk1g5g");
    			set_style(div, "color", /*color*/ ctx[0]);
    			set_style(div, "font-size", /*calcMainFontSize*/ ctx[2]() + "rem");
    			add_location(div, file$c, 12, 4, 368);
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
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(12:4) {#if !$Device[\\\"isMobile\\\"]}",
    		ctx
    	});

    	return block;
    }

    // (11:0) <DefaultSlide>
    function create_default_slot$3(ctx) {
    	let if_block_anchor;
    	let if_block = !/*$Device*/ ctx[1]["isMobile"] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$5();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (!/*$Device*/ ctx[1]["isMobile"]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(11:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
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

    			if (dirty & /*$$scope, color, $Device*/ 19) {
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
    	let $Device;
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(1, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide01', slots, []);
    	let { color } = $$props;
    	const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    	const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;

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

    	$$self.$capture_state = () => ({
    		Device,
    		Color,
    		season,
    		DefaultSlide,
    		color,
    		calcMainFontSize,
    		calcSubFontSize,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, $Device, calcMainFontSize];
    }

    class Slide01 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide01",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide01>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide01>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\2022\Outsourcing\Picam\Slide02.svelte generated by Svelte v3.55.1 */
    const file$b = "src\\component\\PageDesign\\Slide\\2022\\Outsourcing\\Picam\\Slide02.svelte";

    // (10:0) <DefaultSlide>
    function create_default_slot$2(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let br0;
    	let t3;
    	let br1;
    	let t4;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text("프로젝트 목적");
    			t1 = space();
    			div1 = element("div");
    			t2 = text("1. 기구의 카메라의 영상을 외부 디바이스로 확인");
    			br0 = element("br");
    			t3 = text("\r\n            2. 라즈베리파이와 파이카메라 사용");
    			br1 = element("br");
    			t4 = text("\r\n            3. 외부 디바이스는 특정 트리거를 통해 기구의 동작을 제어");
    			set_style(div0, "font-size", /*calcMainFontSize*/ ctx[1]());
    			add_location(div0, file$b, 11, 8, 417);
    			add_location(br0, file$b, 15, 39, 592);
    			add_location(br1, file$b, 16, 31, 630);
    			set_style(div1, "font-size", /*calcSubFontSize*/ ctx[2]());
    			add_location(div1, file$b, 14, 8, 508);
    			attr_dev(div2, "class", "context svelte-1sk1g5g");
    			set_style(div2, "color", /*color*/ ctx[0]);
    			set_style(div2, "font-size", /*calcMainFontSize*/ ctx[1] + "rem");
    			add_location(div2, file$b, 10, 4, 330);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, t2);
    			append_dev(div1, br0);
    			append_dev(div1, t3);
    			append_dev(div1, br1);
    			append_dev(div1, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*color*/ 1) {
    				set_style(div2, "color", /*color*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(10:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
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

    			if (dirty & /*$$scope, color*/ 17) {
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
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $Device;
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(3, $Device = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slide02', slots, []);
    	let { color } = $$props;
    	const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    	const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;

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

    	$$self.$capture_state = () => ({
    		Device,
    		Color,
    		season,
    		DefaultSlide,
    		color,
    		calcMainFontSize,
    		calcSubFontSize,
    		$Device
    	});

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, calcMainFontSize, calcSubFontSize];
    }

    class Slide02 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide02",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide02>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide02>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\2022\Outsourcing\Picam\Slide03.svelte generated by Svelte v3.55.1 */
    const file$a = "src\\component\\PageDesign\\Slide\\2022\\Outsourcing\\Picam\\Slide03.svelte";

    // (7:0) <DefaultSlide>
    function create_default_slot$1(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2022 Outsourcing Slide 03";
    			add_location(p, file$a, 8, 8, 251);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$a, 7, 4, 197);
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
    		source: "(7:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
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
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
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

    	$$self.$capture_state = () => ({
    		Device,
    		Color,
    		season,
    		DefaultSlide,
    		color
    	});

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
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide03",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide03>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide03>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\PageDesign\Slide\2022\Outsourcing\Picam\Slide04.svelte generated by Svelte v3.55.1 */
    const file$9 = "src\\component\\PageDesign\\Slide\\2022\\Outsourcing\\Picam\\Slide04.svelte";

    // (7:0) <DefaultSlide>
    function create_default_slot(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "2022 Outsourcing Slide 01";
    			add_location(p, file$9, 8, 8, 251);
    			attr_dev(div, "class", "context svelte-hqtqk1");
    			set_style(div, "color", /*color*/ ctx[0]);
    			add_location(div, file$9, 7, 4, 197);
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
    		source: "(7:0) <DefaultSlide>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
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
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
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

    	$$self.$capture_state = () => ({
    		Device,
    		Color,
    		season,
    		DefaultSlide,
    		color
    	});

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
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide04",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get color() {
    		throw new Error("<Slide04>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Slide04>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\routes\2021\Projects\BarcodeReader.svelte generated by Svelte v3.55.1 */
    const file$8 = "src\\component\\routes\\2021\\Projects\\BarcodeReader.svelte";

    function create_fragment$8(ctx) {
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
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$8, 9, 0, 554);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BarcodeReader', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BarcodeReader> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		fade,
    		DefaultPage,
    		Slide01,
    		Slide02,
    		Slide03,
    		Slide04,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class BarcodeReader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BarcodeReader",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\component\routes\2021\Projects\Cafe24_Renewal.svelte generated by Svelte v3.55.1 */
    const file$7 = "src\\component\\routes\\2021\\Projects\\Cafe24_Renewal.svelte";

    function create_fragment$7(ctx) {
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
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$7, 9, 0, 554);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Cafe24_Renewal', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cafe24_Renewal> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		fade,
    		DefaultPage,
    		Slide01,
    		Slide02,
    		Slide03,
    		Slide04,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class Cafe24_Renewal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cafe24_Renewal",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\component\routes\2021\Projects\ConvyerVision.svelte generated by Svelte v3.55.1 */
    const file$6 = "src\\component\\routes\\2021\\Projects\\ConvyerVision.svelte";

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
    						childComponent: Slide01,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$6, 9, 0, 554);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ConvyerVision', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ConvyerVision> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		fade,
    		DefaultPage,
    		Slide01,
    		Slide02,
    		Slide03,
    		Slide04,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class ConvyerVision extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ConvyerVision",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\component\routes\2021\Projects\Downloader.svelte generated by Svelte v3.55.1 */
    const file$5 = "src\\component\\routes\\2021\\Projects\\Downloader.svelte";

    function create_fragment$5(ctx) {
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
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$5, 9, 0, 554);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Downloader', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Downloader> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		fade,
    		DefaultPage,
    		Slide01,
    		Slide02,
    		Slide03,
    		Slide04,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class Downloader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Downloader",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\component\routes\2021\Projects\RobotPiano.svelte generated by Svelte v3.55.1 */
    const file$4 = "src\\component\\routes\\2021\\Projects\\RobotPiano.svelte";

    function create_fragment$4(ctx) {
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
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$4, 9, 0, 554);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RobotPiano', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RobotPiano> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		fade,
    		DefaultPage,
    		Slide01,
    		Slide02,
    		Slide03,
    		Slide04,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class RobotPiano extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RobotPiano",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\component\routes\2022\Outsourcing\PicameraServer.svelte generated by Svelte v3.55.1 */
    const file$3 = "src\\component\\routes\\2022\\Outsourcing\\PicameraServer.svelte";

    function create_fragment$3(ctx) {
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
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$3, 9, 0, 554);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PicameraServer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PicameraServer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		fade,
    		DefaultPage,
    		Slide01,
    		Slide02,
    		Slide03,
    		Slide04,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class PicameraServer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PicameraServer",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\component\routes\2022\Outsourcing\Calculator.svelte generated by Svelte v3.55.1 */
    const file$2 = "src\\component\\routes\\2022\\Outsourcing\\Calculator.svelte";

    function create_fragment$2(ctx) {
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
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$2, 9, 0, 554);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Calculator', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Calculator> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		fade,
    		DefaultPage,
    		Slide01,
    		Slide02,
    		Slide03,
    		Slide04,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class Calculator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Calculator",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\component\routes\2022\Outsourcing\Navigation.svelte generated by Svelte v3.55.1 */
    const file$1 = "src\\component\\routes\\2022\\Outsourcing\\Navigation.svelte";

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
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide02,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide03,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					},
    					{
    						childComponent: Slide04,
    						bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    						color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    						buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    						buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    						buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    					}
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(defaultpage.$$.fragment);
    			add_location(div, file$1, 9, 0, 554);
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

    			if (dirty & /*$Color, $season*/ 3) defaultpage_changes.slides = [
    				{
    					childComponent: Slide01,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide02,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide03,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
    				},
    				{
    					childComponent: Slide04,
    					bg: /*$Color*/ ctx[0]["backColor"][/*$season*/ ctx[1]],
    					color: /*$Color*/ ctx[0]["foreColor"][/*$season*/ ctx[1]],
    					buttonBackColor: /*$Color*/ ctx[0]["btnBackColor"][/*$season*/ ctx[1]],
    					buttonBorderColor: /*$Color*/ ctx[0]["btnBdrColor"][/*$season*/ ctx[1]],
    					buttonSelectedColor: /*$Color*/ ctx[0]["btnSelectedColor"][/*$season*/ ctx[1]]
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
    	let $Color;
    	let $season;
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(0, $Color = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(1, $season = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navigation', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navigation> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Color,
    		season,
    		fade,
    		DefaultPage,
    		Slide01,
    		Slide02,
    		Slide03,
    		Slide04,
    		$Color,
    		$season
    	});

    	return [$Color, $season];
    }

    class Navigation extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navigation",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.55.1 */
    const file = "src\\App.svelte";

    // (198:2) {:else}
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
    		p: noop,
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
    		source: "(198:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (194:30) 
    function create_if_block_3(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*drawComponent*/ ctx[2] && create_if_block_4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$5();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*drawComponent*/ ctx[2]) {
    				if (if_block) {
    					if (dirty & /*drawComponent*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_4(ctx);
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
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(194:30) ",
    		ctx
    	});

    	return block;
    }

    // (192:32) 
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
    		p: noop,
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
    		source: "(192:32) ",
    		ctx
    	});

    	return block;
    }

    // (190:2) {#if $season == "Spring"}
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
    		p: noop,
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
    		source: "(190:2) {#if $season == \\\"Spring\\\"}",
    		ctx
    	});

    	return block;
    }

    // (195:3) {#if drawComponent}
    function create_if_block_4(ctx) {
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
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(195:3) {#if drawComponent}",
    		ctx
    	});

    	return block;
    }

    // (201:2) {#if $ContextVisible && drawComponent}
    function create_if_block(ctx) {
    	let div;
    	let router;
    	let current;

    	router = new Router({
    			props: { routes: /*routes*/ ctx[5] },
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
    			add_location(div, file, 201, 2, 6029);
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
    		source: "(201:2) {#if $ContextVisible && drawComponent}",
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
    	let mounted;
    	let dispose;

    	function navbar_height_binding(value) {
    		/*navbar_height_binding*/ ctx[7](value);
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
    		if (/*$season*/ ctx[4] == "Spring") return 0;
    		if (/*$season*/ ctx[4] == "Summer") return 1;
    		if (/*$season*/ ctx[4] == "Fall") return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let if_block1 = /*$ContextVisible*/ ctx[3] && /*drawComponent*/ ctx[2] && create_if_block(ctx);

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
    			add_location(div, file, 188, 1, 5736);
    			set_style(main, "background", /*background*/ ctx[0][/*$season*/ ctx[4]]);
    			attr_dev(main, "class", "svelte-17a7r7l");
    			add_location(main, file, 186, 0, 5640);
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

    			if (!mounted) {
    				dispose = listen_dev(window, "resize", /*windowResize*/ ctx[6], false, false, false);
    				mounted = true;
    			}
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

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block0 = if_blocks[current_block_type_index];

    				if (!if_block0) {
    					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block0.c();
    				} else {
    					if_block0.p(ctx, dirty);
    				}

    				transition_in(if_block0, 1);
    				if_block0.m(div, t1);
    			}

    			if (/*$ContextVisible*/ ctx[3] && /*drawComponent*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*$ContextVisible, drawComponent*/ 12) {
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

    			if (!current || dirty & /*background, $season*/ 17) {
    				set_style(main, "background", /*background*/ ctx[0][/*$season*/ ctx[4]]);
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
    			mounted = false;
    			dispose();
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
    	let $LastPage;
    	let $ContextVisible;
    	let $Device;
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
    	let $Color;
    	validate_store(LastPage, 'LastPage');
    	component_subscribe($$self, LastPage, $$value => $$invalidate(9, $LastPage = $$value));
    	validate_store(ContextVisible, 'ContextVisible');
    	component_subscribe($$self, ContextVisible, $$value => $$invalidate(3, $ContextVisible = $$value));
    	validate_store(Device, 'Device');
    	component_subscribe($$self, Device, $$value => $$invalidate(10, $Device = $$value));
    	validate_store(bench, 'bench');
    	component_subscribe($$self, bench, $$value => $$invalidate(11, $bench = $$value));
    	validate_store(fish_12, 'fish_12');
    	component_subscribe($$self, fish_12, $$value => $$invalidate(12, $fish_12 = $$value));
    	validate_store(fish_11, 'fish_11');
    	component_subscribe($$self, fish_11, $$value => $$invalidate(13, $fish_11 = $$value));
    	validate_store(fish_10, 'fish_10');
    	component_subscribe($$self, fish_10, $$value => $$invalidate(14, $fish_10 = $$value));
    	validate_store(fish_09, 'fish_09');
    	component_subscribe($$self, fish_09, $$value => $$invalidate(15, $fish_09 = $$value));
    	validate_store(fish_08, 'fish_08');
    	component_subscribe($$self, fish_08, $$value => $$invalidate(16, $fish_08 = $$value));
    	validate_store(fish_07, 'fish_07');
    	component_subscribe($$self, fish_07, $$value => $$invalidate(17, $fish_07 = $$value));
    	validate_store(fish_06, 'fish_06');
    	component_subscribe($$self, fish_06, $$value => $$invalidate(18, $fish_06 = $$value));
    	validate_store(fish_05, 'fish_05');
    	component_subscribe($$self, fish_05, $$value => $$invalidate(19, $fish_05 = $$value));
    	validate_store(fish_04, 'fish_04');
    	component_subscribe($$self, fish_04, $$value => $$invalidate(20, $fish_04 = $$value));
    	validate_store(fish_03, 'fish_03');
    	component_subscribe($$self, fish_03, $$value => $$invalidate(21, $fish_03 = $$value));
    	validate_store(fish_02, 'fish_02');
    	component_subscribe($$self, fish_02, $$value => $$invalidate(22, $fish_02 = $$value));
    	validate_store(fish_01, 'fish_01');
    	component_subscribe($$self, fish_01, $$value => $$invalidate(23, $fish_01 = $$value));
    	validate_store(season, 'season');
    	component_subscribe($$self, season, $$value => $$invalidate(4, $season = $$value));
    	validate_store(Color, 'Color');
    	component_subscribe($$self, Color, $$value => $$invalidate(24, $Color = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	const routes = {
    		'/': Main,
    		'/profile': Profile,
    		'/projects': Projects,
    		'/outsourcing': Outsourcing,
    		'/project/2021/barcode': BarcodeReader,
    		'/project/2021/cafe24': Cafe24_Renewal,
    		'/project/2021/convyervision': ConvyerVision,
    		'/project/2021/downloader': Downloader,
    		'/project/2021/robotpiano': RobotPiano,
    		'/outsourcing/2022/picam': PicameraServer,
    		'/outsourcing/2022/calculator': Calculator,
    		'/outsourcing/2022/navigation': Navigation
    	};

    	let premx = 0;
    	let premy = 0;
    	let background = [];
    	let NavbarComponent = 0;
    	let drawComponent = true;
    	let t;

    	set_store_value(
    		Color,
    		$Color["foreColor"] = {
    			"Spring": "#000",
    			"Summer": "#000",
    			"Fall": "#000",
    			"Winter": "#fff"
    		},
    		$Color
    	);

    	set_store_value(
    		Color,
    		$Color["backColor"] = {
    			"Summer": "transparent",
    			"Spring": "transparent",
    			"Fall": "#fff",
    			"Winter": "transparent"
    		},
    		$Color
    	);

    	set_store_value(
    		Color,
    		$Color["btnBackColor"] = {
    			"Spring": "#000",
    			"Summer": "#000",
    			"Fall": "#000",
    			"Winter": "#fff"
    		},
    		$Color
    	);

    	set_store_value(
    		Color,
    		$Color["btnBdrColor"] = {
    			"Spring": "#fff",
    			"Summer": "#fff",
    			"Fall": "#fff",
    			"Winter": "#000"
    		},
    		$Color
    	);

    	set_store_value(
    		Color,
    		$Color["btnSelectedColor"] = {
    			"Spring": "#000",
    			"Summer": "#000",
    			"Fall": "#000",
    			"Winter": "#fff"
    		},
    		$Color
    	);

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

    	var mobile_keys = new Array('iphone', 'ipad', 'android', 'blackberry', 'windows phone', 'windows ce', 'lg', 'mot', 'samsung', 'sonyericsson', 'nokia');
    	set_store_value(Device, $Device["agent"] = navigator.userAgent.toLowerCase(), $Device);

    	onMount(() => {
    		set_store_value(Device, $Device["isMobile"] = false, $Device);
    		set_store_value(LastPage, $LastPage["WindowResized"] = false, $LastPage);
    		set_store_value(LastPage, $LastPage["Layer1"] = "Main", $LastPage);
    		set_store_value(LastPage, $LastPage["Layer2"] = 0, $LastPage);
    		set_store_value(LastPage, $LastPage["Layer3"] = "", $LastPage);
    		set_store_value(LastPage, $LastPage["Index"] = 0, $LastPage);

    		for (var i in mobile_keys) {
    			if ($Device["agent"].match(mobile_keys[i])) {
    				set_store_value(Device, $Device["isMobile"] = true, $Device);
    				break;
    			}
    		}

    		set_store_value(ContextVisible, $ContextVisible = true, $ContextVisible);
    		$$invalidate(0, background['Spring'] = "linear-gradient(to bottom, #089acf 0%, #a1c4fd 60%,#c2e9fb 90%,#8A3B12 100%)", background);
    		$$invalidate(0, background['Summer'] = "linear-gradient(-45deg, #089acf, #0bcea0)", background);
    		$$invalidate(0, background['Fall'] = "linear-gradient(to bottom, #0051ffb4 0%, #a1c4fd 60%,#c2e9fb 90%,#8A3B12 100%)", background);
    		$$invalidate(0, background['Winter'] = "linear-gradient(to bottom, #071B26 0%,#071B26 30%,#8A3B12 95%, #fff 100%)", background);
    	});

    	function windowResize() {
    		$$invalidate(2, drawComponent = false);
    		set_store_value(LastPage, $LastPage["WindowResized"] = true, $LastPage);
    		clearTimeout(t);

    		t = setTimeout(
    			() => {
    				$$invalidate(2, drawComponent = true);
    			},
    			300
    		);
    	}

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
    		Color,
    		LastPage,
    		Device,
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
    		Projects,
    		Outsourcing,
    		BarcodeReader,
    		Cafe24Renewal: Cafe24_Renewal,
    		ConvyerVision,
    		Downloader,
    		RobotPiano,
    		Picam: PicameraServer,
    		Calculator,
    		Navigation,
    		routes,
    		premx,
    		premy,
    		background,
    		NavbarComponent,
    		drawComponent,
    		t,
    		month,
    		mobile_keys,
    		windowResize,
    		$LastPage,
    		$ContextVisible,
    		$Device,
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
    		$season,
    		$Color
    	});

    	$$self.$inject_state = $$props => {
    		if ('premx' in $$props) premx = $$props.premx;
    		if ('premy' in $$props) premy = $$props.premy;
    		if ('background' in $$props) $$invalidate(0, background = $$props.background);
    		if ('NavbarComponent' in $$props) $$invalidate(1, NavbarComponent = $$props.NavbarComponent);
    		if ('drawComponent' in $$props) $$invalidate(2, drawComponent = $$props.drawComponent);
    		if ('t' in $$props) t = $$props.t;
    		if ('month' in $$props) month = $$props.month;
    		if ('mobile_keys' in $$props) mobile_keys = $$props.mobile_keys;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		background,
    		NavbarComponent,
    		drawComponent,
    		$ContextVisible,
    		$season,
    		routes,
    		windowResize,
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
