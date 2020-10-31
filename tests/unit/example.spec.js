import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'
import Home from '@/views/Home.vue'

const nock = require('nock')
const response = require('./response')
const getQuestions = require('@/views/Home.vue').getQuestions

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

  it('should contain', () => {
    let wrapper = shallowMount(Home)
    expect(wrapper.find('.btn-dark').text()).to.contain('Check Answer')
    expect(wrapper.vm.nextQuestion).to.be.false
  })

})

