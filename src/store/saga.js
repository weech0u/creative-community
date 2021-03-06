import { GET_TAGS, GET_TAGS_SUCCESS } from '../common/header/store/constants'
import { GET_HOME_LIST, GET_HOME_LIST_SUCCESS } from '../pages/home/store/contants'
import { GET_DETAIL, GET_DETAIL_SUCCESS } from '../pages/detail/store/constants'
import { getRandomArrayElements } from '../utils/tools'
import { call, put, takeEvery } from 'redux-saga/effects'

function* getTags(action) {
  console.log(action)
  // fetch是ES6提供的原生方法
  const p = () => fetch('https://www.fastmock.site/mock/08fe922b3882e5e82c3cdb63156634b4/api/hotList',{
    method: 'GET'
  })
  // 比axios多了这一步封装
  .then(res=> res.json())
  .then(res=>{
    if (res.success) {
      return getRandomArrayElements(res.data, 6)
    }else {
      console.log('网络请求失败')
    }
  })

  const res = yield call(p)

  yield put({
    type: GET_TAGS_SUCCESS,
    payload: res
  })
}
function* getHomeList(action) {
  // fetch是ES6提供的原生方法
  const p = () => fetch('https://www.fastmock.site/mock/e577042399cc4adf49011be9506c21e7/api/topicList',{
    method: 'GET'
  })
  // 比axios多了这一步封装
  .then(res=> res.json())
  .then(res=>{
    if (res.success) {
      return res.data
    }else {
      console.log('网络请求失败')
    }
  })

  const res = yield call(p)

  yield put({
    type: GET_HOME_LIST_SUCCESS,
    payload: res
  })
}
function* getDetail(action) {
  console.log(action.id)
  const p = () => fetch('https://www.fastmock.site/mock/e577042399cc4adf49011be9506c21e7/api/detail/1', {
    method: 'GET'
  })
  .then(res => res.json())
  .then(res => {
    if (res.code === 200) {
      return res.data
    } else {
      console.log('网络请求失败')
    }
  })
  .catch(error => {
    return error
  })

  const res = yield call(p)

  yield put({
    type: GET_DETAIL_SUCCESS,
    payload: res
    
  })
}

function* rootSage() {
  yield takeEvery(GET_TAGS, getTags)
  yield takeEvery(GET_HOME_LIST, getHomeList)
  yield takeEvery(GET_DETAIL, getDetail)
}

export default rootSage