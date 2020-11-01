import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'
import Home from '@/views/Home.vue'


// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).to.include(msg)
//   })
// })

describe('Home.vue', () => {
  it('should render correctly', () => {})

  it('boolean should be false', () => {
    let wrapper = shallowMount(Home)
    expect(wrapper.vm.isAnswered).to.be.false
    expect(wrapper.vm.nextQuestion).to.be.false
  })

})

