import { View, Text, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const handleNavigateToTravel = () => {
    Taro.navigateTo({ url: '/pages/travel/index' })
  }

  return (
    <View className='index'>
      <View className='index__header'>
        <Text className='index__title'>欢迎使用 Taro 架构模板</Text>
        <Text className='index__subtitle'>快速开始你的小程序开发之旅</Text>
      </View>

      <View className='index__content'>
        <View className='index__card'>
          <Text className='index__card-title'>🚀 随机城市旅行</Text>
          <Text className='index__card-desc'>
            探索中国美丽城市，发现你的下一个目的地
          </Text>
          <Button className='index__button' onClick={handleNavigateToTravel}>
            开始体验
          </Button>
        </View>

        <View className='index__card'>
          <Text className='index__card-title'>📖 示例页面</Text>
          <Text className='index__card-desc'>
            查看项目架构和功能演示
          </Text>
          <Button
            className='index__button index__button--secondary'
            onClick={() => Taro.navigateTo({ url: '/pages/example/index' })}
          >
            查看示例
          </Button>
        </View>
      </View>
    </View>
  )
}
