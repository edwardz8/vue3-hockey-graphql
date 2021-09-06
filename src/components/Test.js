import {Vue, h} from 'vue'

/* const app = Vue.createApp({
    components: {
        'test': test,
        'test2': v
    }
}) */

const test3 = Vue.component('test', {
    functional: true,
    render: function(createElement, context) {
        // ...
        return createElement('h1', 'testing 3')
    }
})

export {
    test3
}

const test2 = Vue.component('test2', {
    el: "#test",
    props: {
        // ...
    },
    template: `
    <div id="test">
      hello
    </div>
  `,
    /* render: h => h(div), */
    render() {
        return h(app)
      }
})

/* export const test = new Vue({
  el: '#demo',
  render: function (h) {
    return (
        <span id="demo">Hello</span>
    )
  }
}) */