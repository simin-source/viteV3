
import './mySwiper.css';
export default defineComponent({
	name: 'MySwiper',
	data() {
		return {
			isMove: true,
			left: 0,
			canClick: false, // 是否可点击，控制点击频率
			currentIndex: 1,
			isPre: false,
			isNext: false,
			isCenter: false,
		};
	},
	props: {
		imgArray: {
			type: Array,
		},
	},
	emits: {
		change(data: any) {
			// 执行运行时校验
			return data;
		},
	},
	methods: {
		tapLeft() {
			// console.log('tapLeft');
			if (!this.canClick) {
				return;
			}
			this.canClick = false;
			setTimeout(() => {
				this.canClick = true;
			}, 500);
			for (let j = 0; j < 3; j++) {
				if (this.currentIndex === j) {
					document.getElementById(`item${j}`)?.setAttribute('class', `item-container item${j} toCenter`);
				} else if (this.currentIndex + 1 === j) {
					//左向右
					document.getElementById(`item${j}`)?.setAttribute('class', `item-container item${j} toRight`);
				} else {
					//右向左
					document.getElementById(`item${j}`)?.setAttribute('class', `item-container item${j} toleft`);
				}
			}
			this.$emit('change', {
				detail: {
					current: this.currentIndex,
				},
			});
		},
		tapRight() {
			// console.log('tapRight');
			if (!this.isMove) {
				return;
			}
			this.canClick = false;
			setTimeout(() => {
				this.canClick = true;
			}, 500);
			for (let j = 0; j < 3; j++) {
				if (this.currentIndex === j) {
					//居中
					document.getElementById(`item${j}`)?.setAttribute('class', `item-container item${j} toCenter`);
				} else if (this.currentIndex + 1 === j) {
					//右向左
					document.getElementById(`item${j}`)?.setAttribute('class', `item-container item${j} toleft`);
				} else {
					//左向右
					document.getElementById(`item${j}`)?.setAttribute('class', `item-container item${j} toRight`);
				}
			}
			this.$emit('change', {
				detail: {
					current: this.currentIndex,
				},
			});
		},
		touchmove(e: any) {
			// 频率控制，一次移动完成后，才能进行下一次
			if (this.isMove) {
				return;
			}
			let moveLength = (e.touches[0].pageX - this.left);
			moveLength = moveLength > 60 ? 60 : moveLength;
			moveLength = moveLength < -60 ? -60 : moveLength;
			const rate = moveLength / 60;
			this.canClick = true;
			if (rate === 1) {
				//从右往左滑
				this.isMove = true;
				this.tapRight();
			} else if (rate === -1) {
				//从左往右滑
				this.isMove = true;
				this.tapLeft();
			}
		},
		touchstart(e: any) {
			this.left = e.touches[0].pageX;
		},
		touchend(e: any) {
			setTimeout(() => {
				this.isMove = false;
			}, 500);
		},
		tapItemFn(index: number) {
			// console.log('点击切换slide', index);

			this.currentIndex = index;
			for (let j = 0; j < 3; j++) {
				if (this.currentIndex === j) {
					document.getElementById(`item${j}`)?.setAttribute('class', `item-container item${j} toCenter`);
				} else if (this.currentIndex + 1 === j) {
					//左向右
					document.getElementById(`item${j}`)?.setAttribute('class', `item-container item${j} toRight`);
				} else {
					//右向左
					document.getElementById(`item${j}`)?.setAttribute('class', `item-container item${j} toleft`);
				}
			}
			this.$emit('change', {
				detail: {
					current: this.currentIndex,
				},
			});
		},
	},
	render() {
		return <div class="swiper-page" onTouchmove={this.touchmove} onTouchstart={this.touchstart} onTouchend={this.touchend}>
			<div class="swiper-container">
				{this.imgArray?.map((item: any, index: number) => {
					// console.log('更新动画', item);

					return <div id={`item${index}`} class={`item${index} item-container`} onClick={() => this.tapItemFn(index)}>
						<img class="background" src={item.url} />
						<div class="item-text">{item.text}</div>
					</div >;
				})}
			</div >
		</div >;
	},
});