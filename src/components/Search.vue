<template lang="html">
  <div class="search-root">
    <!-- search title -->
    <h2 class="page-title">
      بحث عن/
      <span>إسم المكان</span>
    </h2>
    <!-- end search title -->

    <!-- search form -->
    <form class="search-form">
      <div class="topp">
        <div class="input-box">
          <label for="space_name">اسم المكان</label>
          <input type="text" id="space_name" placeholder="اسم المكان" v-model="filterInput">
        </div>
        <div class="input-box">
          <label for="city">المدينة</label>
          <select id="city" v-model="city" @change="sortCity(this.city)">
            <option value="cairo">القاهرة</option>
            <option value="fayoum">الفيوم</option>
          </select>
        </div>
        <div class="input-box">
          <label for="category">الفئة</label>
          <select id="category">
            <option value="">غرفة إجتماعات</option>
            <option value="">ورشة عمل</option>
            <option value="">غرفة عرض سينما</option>
          </select>
        </div>
        <div class="input-box">
          <label for="date">اليوم</label>
          <input type="date" id="date">
        </div>

        <button class="search-btn">
          <span class="mdi mdi-shield-search"></span>
        </button>
      </div>

      <div class="bottomm">
        <div class="filters">
          <div class="check-box">
            <input type="checkbox" id="air_condition">
            <label for="air_condition">مكيف هواء</label>
          </div>

          <div class="check-box">
            <input type="checkbox" id="food_and_drinks">
            <label for="food_and_drinks">مأكولات ومشروبات</label>
          </div>

          <div class="check-box">
            <input type="checkbox" id="open_place">
            <label for="open_place">مكان مفتوح</label>
          </div>

          <div class="check-box">
            <input type="checkbox" id="garage">
            <label for="garage">جراج سيارات</label>
          </div>

          <div class="check-box">
            <input type="checkbox" id="laptop">
            <label for="laptop">لابتوب/ أيباد</label>
          </div>
        </div>



      </div>
    </form>
    <!-- end search form -->

    <!-- show options -->
    <div class="show-options">
      <div class="view">
        عرض الاماكن بواسطة
        <span class="mdi mdi-apps" @click="isActive = false"></span>
        <span class="mdi mdi-reorder-horizontal" @click="isActive = true"></span>
      </div>

      <div class="order">
        <label for="order">ترتيب بواسطة</label>
        <select id="order" v-model="sort" @change="sortation()" placeholder="ترتيب بواسطة">
          <option value="distance">المسافة</option>
          <option value="low_price">أقل سعر</option>
          <option value="high_price">أعلى سعر</option>
          <option value="rate">التقييم</option>
        </select>

      </div>
    </div>
    <!-- end show options -->

    <!-- spaces list -->
    <ul class="spaces-list grid" :class="{ list: isActive}">
      <!-- single space item -->
      <li class="single-space" v-for="(space, index) in filterBy(spaces, filterInput)">
        <router-link v-bind:to="{path: '/spaces/'+space.name, params: {name: space.name, total_rate: space.total_rate}}" class="space-img">
          <img src="../assets/img/space1.jpg" alt="">
        </router-link>

        <div class="dsbb">
          <div class="space-info">
            <div class="space-title">
              <router-link v-bind:to="{path: '/spaces/'+space.name, params: {name: space.name}}" class="space-name">
                <h2>
                  {{space.name}}
                </h2>
              </router-link>

              <p class="space-distance">
                {{Math.round(space.distance*100)/100}}
                 كم
              </p>
            </div>

            <star-rating :rating="space.total_rate" :read-only="true" :increment="0.01" :rtl="true" :star-size="15"></star-rating>

            <p class="space-address">
              <span class="mdi mdi-map-marker"></span>
              {{space.address}}
            </p>
          </div>

          <div class="space-description">
            <p>
              {{space.description}}
            </p>
            <h5 class="space-price">
              السعر يبدأ من
              <span>{{space.price}}ج</span>
            </h5>

            <ul class="space-features">
              <li v-show="space.features.laptop">
                <span class="mdi mdi-presentation-play"></span>
              </li>
              <li v-show="space.features.food">
                <span class="mdi mdi-food-fork-drink"></span>
              </li>
              <li v-show="space.features.air_condition">
                <span class="mdi mdi-air-conditioner"></span>
              </li>
              <li v-show="space.features.open_air">
                <span class="mdi mdi-tree-outline"></span>
              </li>
            </ul>

          </div>

          <button class="space-reserve-btn">
            احجز الأن
          </button>

        </div>

      </li>
      <!-- end single space item -->


    </ul>
    <!-- end spaces list -->

  </div>
</template>

<script>

import * as firebase from 'firebase'

export default {
  name: 'Search',
  data () {
    return {
      value5: [10, 500],
        dotOptions: [{
          tooltip: 'always'
        },
        {
          tooltip: 'always'
        }],
      isActive: false,
      spaces: [],
      rates: [],
      sort: '',
      city: '',
      filterInput: '',
      user_lat: 0,
      user_long: 0
    }
  },
  methods: {

    distt: function(lat1, lon1, lat2, lon2, unit) {
      if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
      }
      else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
      }
    },
    makeRates: function(bva){
      var ss = 0;
      for (var i = 0; i < bva.length; i++) {
        ss+= bva[i].star;
      }
      return ss;
    },
    getSpaces: function(){
      firebase.firestore().collection("spaces").get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              'address': doc.data().address,
              'description': doc.data().description,
              'name': doc.data().name,
              'city': doc.data().city,
              'price': doc.data().price,
              'features': {
                'air_condition': doc.data().features.air_condition,
                'food': doc.data().features.food,
                'garage': doc.data().features.garage,
                'laptop': doc.data().features.laptop,
                'open_air': doc.data().features.open_air
              },
              'location': {
                'lat': doc.data().location.lat,
                'long': doc.data().location.long
              },
              'rate': doc.data().rate,
              'total_rate': this.makeRates(doc.data().rate),
              'room': doc.data().room,
              'distance': this.distt(this.user_lat, this.user_long, doc.data().location.lat, doc.data().location.long, 'K')
            }

            this.spaces.push(data)

          });
      });
    },
    filterBy(list, value) {
      return list.filter(function(space){
        return space.name.indexOf(value) > -1;
      })
    },
    sortation(){
      if (this.sort === 'low_price') {
        return this.spaces.sort(function(a, b) {
          return a.price - b.price
        });
      }
      else if (this.sort === 'high_price') {
        return this.spaces.sort(function(a, b) {
          return b.price - a.price
        });
      }
      else if (this.sort === 'distance') {
        return this.spaces.sort(function(a, b) {
          return a.distance - b.distance
        });
      }
      else if (this.sort === 'rate') {
        return this.spaces.sort(function(a, b) {
          return b.total_rate - a.total_rate
        });
      }
    },
    sortCity(value){
      return spaces.filter(function(space){
        return space.city.indexOf(value) > -1;
      })
    },
    geoNav(){
      if(navigator.geolocation) {
    	   navigator.geolocation.getCurrentPosition(this.showPosition);
    	}
      else {
    	  this.error = "Geolocation is not supported.";
  		}
    },
    showPosition:function (position) {
  		this.user_lat = position.coords.latitude;
  		this.user_long = position.coords.longitude;
      console.log(this.user_long);
	  }
  },
  created: function(){
    this.getSpaces();
    this.geoNav();
  }
}
</script>

<style lang="sass">
  @import '../assets/sass/mixins'

  .search-root
    padding: 100px 50px
    background: #F8F8F8

    .page-title
      span
        font-size: 15px
        font-weight: normal

    .search-form
      background: white
      padding: 20px 50px
      width: 100%
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.1)
      margin-top: 30px

      .topp
        display: flex
        align-items: flex-end
        justify-content: space-between
        flex-wrap: wrap

      .input-box
        label
          display: block
          font-size: 14px

        input, select
          margin-top: 20px
          height: 50px
          width: 240px
          padding: 5px 10px
          color: $gray_text

      .search-btn
        height: 50px
        width: 50px
        background: transparent
        color: $color
        display: flex
        align-items: center
        justify-content: center
        border: none
        cursor: pointer
        border: 1px solid transparent
        font-size: 60px
        transition: 0.2s ease-in-out all

        &:hover
          transform: scale(1.05)

    .bottomm
      display: flex
      align-items: center
      justify-content: space-between
      margin-top: 25px
      padding-left: 17px
      flex-wrap: wrap

      .filters
        display: flex
        align-items: center
        flex-wrap: wrap

        .check-box
          display: flex
          align-items: center
          justify-content: center
          label
            font-size: 13px
            margin-right: 10px
            margin-left: 35px


      .vue-slider
        width: 300px !important
        margin-top: 25px

        .vue-slider-dot-tooltip-inner
          background: $color
          border-color: $color

        .vue-slider-process
          background-color: $color

        .vue-slider-dot-handle-focus
          box-shadow: 0 0 10px $color



    .show-options
      margin-top: 30px
      display: flex
      align-items: center
      justify-content: space-between
      font-size: 13px
      color: #747474

      .view
        display: flex
        align-items: center
        span
          margin-right: 5px
          font-size: 30px
          cursor: pointer
          &:hover
            color: $color

        span.active
          background: $color

      .order
        select
          height: 40px
          width: 150px
          padding: 5px 10px
          background: #F8F8F8
          margin-right: 10px
          border: 1px solid #747474
          color: #747474

    /*spaces list*/
    .spaces-list
      list-style-type: none
      display: flex
      align-items: center
      justify-content: space-between
      flex-wrap: wrap
      margin-top: 10px
      margin-right: -25px
      margin-left: -25px

      .single-space
        position: relative
        width: 350px
        margin: 25px
        background: white
        transition: 0.3 ease-in-out all
        box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.2)
        border: 5px solid rgba(0,0,0, 0.1)



        .space-img
          display: block
          width: 100%
          img
            width: 100%
            height: 180px

        .space-title
          display: flex
          align-items: center
          justify-content: space-between
          padding: 10px 20px
          padding-bottom: 0

        .space-name
          text-decoration: none
          color: $color
          &:hover
            text-decoration: underline
          h2
            font-size: 22px

        .vue-star-rating
          padding-right: 10px

        .space-address
          font-size: 12px
          margin: 10px 20px
          margin-top: 5px
          color: gray
          span
            font-size: 20px

        .space-info
          border-bottom: 2px solid #a6a6a6

        .space-description
          padding: 20px
          font-size: 12px
          color: gray
          border-bottom: 2px solid #a6a6a6

        .space-price
          margin-top: 10px
          span
            font-size: 25px
            color: $color

        .space-features
          display: flex
          list-style-type: none
          color: #666
          margin-top: 10px

          li
            font-size: 25px
            margin: 0 5px

        .space-reserve-btn
          margin: 10px auto
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


    .spaces-list.list
      list-style-type: none
      display: flex
      align-items: center
      justify-content: space-between
      flex-wrap: wrap
      margin-top: 10px
      margin-right: -25px
      margin-left: -25px

      .single-space
        position: relative
        width: 100%
        height: 250px
        margin: 25px
        background: white
        transition: 0.3 ease-in-out all
        box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.2)
        border: 5px solid rgba(0,0,0, 0.1)
        display: flex
        align-items: flex-start
        justify-content: space-between

        .dsbb
          width: calc(100% - 300px)
          position: relative

        .space-img
          display: block
          width: 300px
          img
            width: 100%
            height: 240px

        .space-title
          display: flex
          align-items: center
          justify-content: space-between
          padding: 10px 20px
          padding-bottom: 0
          width: 100%

        .space-name
          text-decoration: none
          color: $color
          &:hover
            text-decoration: underline
          h2
            font-size: 22px

        .vue-star-rating
          padding-right: 10px

        .space-address
          font-size: 12px
          margin: 10px 20px
          margin-top: 5px
          color: gray
          span
            font-size: 20px

        .space-info
          border-bottom: none

        .space-description
          padding: 20px
          font-size: 12px
          color: gray
          border-bottom: none

        .space-price
          margin-top: 10px
          span
            font-size: 25px
            color: $color

        .space-features
          display: flex
          list-style-type: none
          color: #666
          margin-top: 10px

          li
            font-size: 25px
            margin: 0 5px

        .space-reserve-btn
          margin: 10px auto
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
          position: absolute
          bottom: 20px
          left: 20px
          &:hover
            background: transparent
            color: $color



</style>
