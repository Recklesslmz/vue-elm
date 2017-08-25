<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" :class="['menu-item',{'current':currentIndex === index}]" v-for="(item,index) in foods"
            @click="selectMenu(index,$event)">
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in foods" class="food-list" ref="foodList">
          <h1 class="title">
            {{item.name}}
          </h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-common">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'
  export default {
    data() {
      return {
        foods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    created() {
      this.getGoods()
    },
    methods: {
      getGoods() {
        this.$http.get('/api/goods').then((response) => {
          if (response.data.errno === 0) {
            this.foods = response.data.data
            this.$nextTick(() => {
              this._initScroll()
              this._calculateHeight()
            });
            console.log(response)
          }
        });
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height);
        }
        console.log(this.listHeight[11])
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }

        }
        return 0
      }

    },
    components: {
      'v-cartcontrol': cartcontrol
    }
  }

</script>
<style lang="scss">
  .goods {
    display: flex;
    position: absolute;
    width: 100%;
    overflow: hidden;
    top: 173px;
    bottom: 46px;
    .menu-wrapper {
      flex: 0 0 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        border-bottom: 1px solid rgba(7, 17, 27, .2);
        .text {
          display: table-cell;
          line-height: 15px;
          font: {
            size: 12px;
          }
        ;
          vertical-align: middle;
        }
        &.current {
          background: white;
          position: relative;
          z-index: 10;
          .text {
            border: none;
          }
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      background: #fff;
      .title {
        padding: {
          left: 14px;
        }
      ;
        height: 26px;
        line-height: 26px;
        border: {
          left: 2px solid #d9dde1;
        }
      ;
        font: {
          size: 12px;
        }
      ;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        position: relative;
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            font: {
              size: 14px;
            }
          ;
            color: rgb(7, 17, 27);
            line-height: 14px;
          }
          .desc {
            font: {
              size: 10px;
            }
            line-height: 10px;
            color: rgb(147, 153, 159);
          }
          .extra {
            margin: {
              top: 5px;
            }
          ;
            .count {
              margin: {
                right: 12px;
              }
            ;
            }
            span {
              font: {
                size: 10px;
              }
              line-height: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .price {
            line-height: 24px;
            .now {
              font: {
                weight: 700;
              }
            ;
              margin: {
                right: 18px;
              }
            ;
              font: {
                size: 14px;
              }
            ;
              color: #ff0000;
            }
            .old {
              font: {
                weight: 700;
              }
            ;
              text-decoration: line-through;
              font: {
                size: 10px;
              }
            ;
            }
          }
        }
      }
      .border-common {
        border-bottom: 1px solid rgba(7, 17, 27, .1);
      }
    }
  }

  .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 1px;
  }
</style>
