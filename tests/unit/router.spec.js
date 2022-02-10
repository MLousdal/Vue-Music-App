import SongItem from '@/components/SongItem.vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

describe('Router', () => {
  test('renders router link', () => {
    const song = {
      docID: '2rtyuiuhgb',
    }

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    })

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'Song',
      params: { id: song.docID },
    })
  })
})
