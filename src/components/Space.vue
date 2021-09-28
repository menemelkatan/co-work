<template lang="html">
  <div class="space-root">
    <div class="space-header">
      <!-- space header -->
      <div class="space-header-contain">
        <h2>
          {{space.name}}
        </h2>
        <star-rating :rating="space.total_rate" :read-only="true" :increment="0.01" :rtl="true" :star-size="30"></star-rating>
        <p class="space-address">
          <span class="mdi mdi-map-marker"></span>
          {{space.address}}
        </p>
        <button class="space-map-btn">
          عرض على الخريطة
        </button>
      </div>
    </div>
    <!-- end space header -->

    <!-- space rooms -->
    <div class="space-rooms">
      <h2 class="title">
        الغرف والأسعار
      </h2>
      <div class="room" v-for="(room, index) in space.rooms">
        <img class="room-img" src="../assets/img/space1.jpg" alt="">
        <h3 class="room-title">
          غرفة {{index+1}}
        </h3>
        <hr>
        <p class="room-description">
          <b>تتسع ل {{room.person}} أشخاص</b>
          <br>
          {{room.description}}
        </p>
        <ul class="room-features">
          <li>
            <span class="mdi mdi-presentation-play"></span>
          </li>
          <li>
            <span class="mdi mdi-food-fork-drink"></span>
          </li>
          <li>
            <span class="mdi mdi-air-conditioner"></span>
          </li>
          <li>
            <span class="mdi mdi-tree-outline"></span>
          </li>
        </ul>
        <div class="room-footer">
          <button class="room-reserve-btn">
            إحجز الأن
          </button>
          <span class="vl"></span>
          <p class="price">
            السعر يبدأمن
            <br>
            <span>
              {{room.price}}
              ج
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- end space rooms -->

    <!-- space features -->
    <div class="space-features">
      <h2 class="title">ليه تحجز عندنا؟؟</h2>
      <ul class="features">
        <li>
          <span class="mdi mdi-home-lock"></span>
          <div>
            <p>
              <b>
                الخصوصية التامة
              </b>
            </p>
            <p>
               تمتع بخصوصية تامة وأمان لأشيائك وعدم الإزعاج فى جميع غرفنا
            </p>
          </div>
        </li>
        <li v-show="space.features.air_condition">
          <span class="mdi mdi-tree-outline"></span>
          <div>
            <p>
              <b>
                المكان كامل هواء مكيف
              </b>
            </p>
            <p>
               المكان بالكامل مكيف بالهواء طوال الوقت فى جميع الغرف تمتع بهواء نظيف فى بيئة نظيفة
            </p>
          </div>
        </li>
        <li v-show="space.features.food">
          <span class="mdi mdi-food-fork-drink"></span>
          <div>
            <p>
              <b>
                مأكولات ومشروبات نظيفة
              </b>
            </p>
            <p>
               تمتع بأرقى امأكولات والمشروبات بأرخص الأسعار طوال فترة إقامتك معنا
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- end space features -->

    <!-- space location -->
    <div class="space-location">
      <div class="space-address">
        <h2 class="title">
          عنواننا
        </h2>
        <p>
           {{space.address}}
        </p>
        <button class="space-map-btn">
          إحصل على الإتجاهات
        </button>
      </div>
      <div class="space-map">
        <l-map
          style="height: 80%; width: 100%"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :lat-lng="[space.location.lat, space.location.long]">

            <l-icon
            icon-url="../assets/img/logo.png" >
          </l-icon>

        </l-marker>
        </l-map>
      </div>
    </div>
    <!-- end space location -->

  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'Space',
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 10,
      center: [29.3199972, 30.8381436],
      bounds: null,
      nm: '',
      space: {
        name: '',
        address: '',
        price: null,
        rates: [],
        rooms: [],
        description: '',
        location: {
          lat: null,
          long: null
        },
        features: {
          air_condition: false,
          food: false,
          garage: false,
          laptop: false,
          open_air: false
        },
        total_rate: null
      }
    };
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    makeRates: function(bva){
      var ss = 0;
      for (var i = 0; i < bva.length; i++) {
        ss+= bva[i].star;
      }
      return ss;
    },
    fetchData () {
      firebase.firestore().collection('spaces').where('nm', '==', this.$route.params.name).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.space.name = doc.data().name
            this.space.address = doc.data().address
            this.space.description = doc.data().description
            this.space.price = doc.data().price
            this.space.rooms = doc.data().room
            this.space.rates = doc.data().rate
            this.space.location.lat = doc.data().location.lat
            this.space.location.long = doc.data().location.long
            this.space.features.air_condition = doc.data().features.air_condition
            this.space.features.food = doc.data().features.food
            this.space.features.open_air = doc.data().features.open_air
            this.space.features.laptop = doc.data().features.laptop
            this.space.features.garage = doc.data().features.garage
            this.space.total_rate = this.makeRates(doc.data().rate)

          })
        })
    }
  },
  beforeRouteEnter(to, from, next){
    firebase.firestore().collection('spaces').where('name', '==', to.params.name).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.space.name = doc.data().name
            vm.space.address = doc.data().address
            vm.space.description = doc.data().description
            vm.space.price = doc.data().price
            vm.space.rooms = doc.data().room
            vm.space.rates = doc.data().rate
            vm.space.location.lat = doc.data().location.lat
            vm.space.location.long = doc.data().location.long
            vm.space.features.air_condition = doc.data().features.air_condition
            vm.space.features.food = doc.data().features.food
            vm.space.features.open_air = doc.data().features.open_air
            vm.space.features.laptop = doc.data().features.laptop
            vm.space.features.garage = doc.data().features.garage
            vm.space.total_rate = vm.makeRates(doc.data().rate)
          })
        })
      })
  },
  watch: {
    '$route': 'fetchData'
  },
  created: function() {
    this.fetchData()
  }
}
</script>

<style lang="sass">
  @import '../assets/sass/mixins'

  .space-root
    /*space header*/
    .space-header
      background: lighten($color, 15) url('../assets/img/pattern1.png') center
      background-size: cover
      color: white
      display: flex
      align-items: center
      justify-content: center
      padding: 50px

      h2
        font-size: 60px
        text-shadow: 5px 5px 0 $color

      .vue-star-rating
        margin-bottom: 10px
        margin-top: 4px

      .space-map-btn
        width: 200px
        height: 40px
        display: flex
        margin-top: 20px
        align-items: center
        justify-content: center
        background: white
        border: 2px solid $color
        color: $color
        border-radius: 25px
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2)
        cursor: pointer
        transition: 0.2s ease-in-out all
        &:hover
          background: transparent
          border-color: white
          color: white


    /*space rooms*/
    .space-rooms
      list-style-type: none
      display: flex
      flex-wrap: wrap
      justify-content: space-around

      .title
        width: 100%
        font-size: 35px
        font-weight: bolder
        text-align: center
        margin: 20px 0
        color: $color
        text-shadow: 5px 5px 0 #cccccc

      .room
        width: 270px
        margin: 25px

        .room-img
          width: 100%
          height: 150px

        .room-title
          font-size: 20px
          margin-top: 10px
          text-align: center

        hr
          margin: 20px 0
          border-color: white

        .room-description
          color: $gray_text
          font-size: 13px

        .room-features
          margin: 20px 0
          width: 100%
          display: flex
          align-items: center
          justify-content: center
          list-style-type: none
          color: #666
          margin-top: 10px

          li
            font-size: 25px
            margin: 0 5px

        .room-footer
          width: 100%
          display: flex
          align-items: center
          justify-content: space-around

          .vl
            height: 100px
            width: 1px
            background: $gray_text
            margin: 0 10px

          .room-reserve-btn
            width: 100px
            height: 40px
            display: flex
            align-items: center
            justify-content: center
            background: $color
            border: 2px solid $color
            color: white
            border-radius: 25px
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2)
            cursor: pointer
            transition: 0.2s ease-in-out all
            &:hover
              background: transparent
              color: $color

          .price
            font-size: 13px
            span
              color: $color
              font-size: 28px
              font-weight: bolder


    /*space features*/
    .space-features
      background: lighten($color, 15) url('../assets/img/pattern1.png') center
      background-size: cover
      color: white
      padding: 30px
      .title
        color: #FFDB65
        font-weight: bolder
        text-align: center
        margin: 20px 0
        font-size: 35px
        text-shadow: 3px 5px 0 rgba(#ffdb65, 0.19)

      .features
        list-style-type: none
        display: flex
        align-items: flex-start
        justify-content: space-around

        li
          margin: 30px
          display: flex
          align-items: center

          .mdi
            font-size: 80px


    /*space location*/
    .space-location
      background: white
      display: flex

      .space-address
        width: 40%
        padding: 50px
        display: flex
        align-items: stretch
        justify-content: center
        flex-wrap: wrap

        .title
          color: $text
          font-weight: bolder
          text-align: center
          margin: 20px 0
          font-size: 35px
          text-shadow: 3px 5px 0 rgba(#000000, 0.19)
          width: 100%

        p
          margin: 20px 0
          text-align: right
          width: 100%


        .space-map-btn
          width: 200px
          height: 40px
          display: flex
          margin: 20px auto
          align-items: center
          justify-content: center
          background: $text
          border: 2px solid $text
          color: white
          border-radius: 25px
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2)
          cursor: pointer
          transition: 0.2s ease-in-out all
          &:hover
            background: transparent
            color: $text


      .space-map
        width: 60%
        height: 500px



</style>
