(function () {
    // 下拉刷新
    const NUM = 10;
    const content = document.getElementById('wrapper');
    const text = document.getElementById('pull-down-text');
    for(let i = 0; i < NUM; i++) {
        const div = document.createElement('div');
        div.innerText = `文案呀文案${i}`;
        document.getElementById('content').appendChild(div);
    }

    const DISTANCE = 60; // 若滑动位置差值达到此值，则触发下拉刷新
    let initPos = 0, // 初始位置
        curDistance, // 滑动距离
        trigger = false; // 是否需要触发刷新方法

    content.addEventListener('touchstart', (e) => {
        console.log('touchstart', e);
        initPos = e.touches[0].pageY;
        text.innerText = '下拉刷新';
        content.style.position = 'relative';
        content.style.transition = 'transform 0s';
    });

    content.addEventListener('touchmove', (e) => {
        const curPos = e.touches[0].pageY;
        curDistance = curPos - initPos;
        console.log('touchmove', curDistance);
        // 滑动距离大于0为向下滑动，超过 DISTANCE 时将 trigger 置为 true
        if (curDistance > DISTANCE) {
            trigger = true;
            text.innerText = '释放刷新';
        }
        content.style.transform = `translateY(${curDistance}px)`;
    });

    content.addEventListener('touchend', () => {
        console.log('touchend');
        if (trigger) {
            text.innerText = '正在刷新';
            refresh();
            trigger = false; // 调用完重新将 trigger 置为 false
            
        }
        content.style.transform = 'translateY(0)';
        content.style.transition = 'transform 0.5s ease 1s';
        setTimeout(() => {
            text.innerText = '下拉刷新';
        }, 2000);
    });

    function refresh() {
        console.log('refresh function call');
    }
})();