import {
  runInAction,
  stores,
  onReady,
} from 'mutants-microfx';


onReady(() => {
  runInAction(() => {
  	// 模拟用户登录状态
    //stores.user.userName = 'test001';
  });
})
