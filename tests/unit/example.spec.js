import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue' 

const App = {
	template: '<p>{{ msg }}</p>',
	props: ['msg']
}

test('displays message', () => {
	const wrapper = mount(App, {
		propsData: {
			msg: 'Hello World'
		}
	})

	expect(wrapper.text()).toContain('Hello World')
})
