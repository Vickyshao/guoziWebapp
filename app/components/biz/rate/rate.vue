<template>
  <div class="comment">
    <div class="comment-title">
      评价{{title}}
    </div>
    <div class="rate">
      <div class="controller" v-for="(item,itemindex) in starList">
        <span class="rate-name">{{item.name}}</span>
        <div class="">
            <div class="star"
                 v-for="(star,index) in item.starList"
                 @click="rate(index,itemindex)"
            >
              <img :src="star.select ? icons.redStar : icons.greyStar" alt="">
            </div>
        </div>
        <span class="score">{{item.score}}分</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'rate',
    data() {
        return {
            icons: {
                greyStar: require('../../../../public/img/group-66.svg'),
                redStar: require('../../../../public/img/group-67.svg'),
            },
        };
    },
    props: {
        title: {
            type: String,
            default() {
                return '';
            },
        },
        starList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    methods: {
        rate(index, itemindex) {
            this.starList[itemindex].score = (index + 1) * 20;
            if (index === 4) {
                for (var i = 0; i <= index; i++) {
                    this.$set(this.starList[itemindex].starList[i], 'select', true);
                }
            } else {
                for (var i = 0; i <= index + 1; i++) {
                    this.$set(this.starList[itemindex].starList[i], 'select', true);
                }
                for (var i = index + 1; i < 5; i++) {
                    this.$set(this.starList[itemindex].starList[i], 'select', false);
                }
            }
        },
    },
    mounted() {
        for (var b = 0; b < this.starList.length; b++) {
            this.starList[b].starList = [];
            for (var i = 0; i < 5; i++) {
                this.starList[b].starList.push({
                    select: false,
                });
            }
        }
    },
};
</script>

<style lang="less" scoped>

.comment {
    margin: 0 50px;
    .comment-title {
        padding-top: 35px;
        font-size: 50dpx;
        font-weight: 600;
        color: #4a4a4a;
    }
    .rate {
        padding-top: 100px;
        .controller {
            padding-bottom: 40px;
            display: flex;
            justify-content: space-between;
            .rate-name {
                font-size: 28dpx;
                line-height: 1.43;
                color: #666666;
            }
            .score {
                font-size: 28dpx;
                line-height: 1.43;
                color: #666666;
                width: 100px;
                text-align: right;
            }
        }
    }
    .star {
        float: left;
        width: 32px;
        height: 32px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
    }
}

</style>
