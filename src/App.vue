<!-- @author Mitskevich Yauheni -->
<template>
  <v-app>
    <v-overlay
      style="z-index: 14"
      :color="$vuetify.theme.dark ? 'black' : 'white'"
      opacity="1"
      :value="overlay"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="snackbar"
      timeout="5000"
      :multi-line="true"
      color="primary"
      elevation="24"
    >
      {{'Оставшееся время пробного периода: \n' + time}}
    </v-snackbar>
    <v-app-bar
      class="c-app-bar"
      app
      color="primary"
      dark
      :prominent="$route.path === '/' || $route.path[3] === '/'"
      src="./assets/font_bar.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to right, #FF80AB, rgba(0,0,0,.0)"
        ></v-img>
      </template>
      <v-toolbar-title
        class="d-flex align-end"
      >
        <v-img
          width="40"
          src="./assets/icon_title.png"
        />
        urgine
      </v-toolbar-title>
      <v-spacer/>
      <v-btn @click="goToPage('/Settings')"
             color="primary"
             icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main>
      <transition name="toolbar">
        <router-view/>
      </transition>
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="calculator in calculators"
            :key="calculator.id"
            :cols="calculator.cols"
          >
            <v-card class="elevation-3">
              <v-dialog
                v-model='calculator.description.show'
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="btn-help-circle"
                    icon
                    small
                    fab
                    :ripple="{ class: 'primary--text'}"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    {{calculator.name}}
                  </v-card-title>
                  <v-card-text>
                    {{calculator.description.text}}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer/>
                    <v-btn
                      color="primary"
                      text
                      @click="calculator.description.show = false"
                    >
                      Назад
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-card-text>
                <v-row dense align="center">
                  <v-col class="text-h6 text--primary">
                    {{calculator.name}}
                  </v-col>
                  <v-btn
                    color="primary"
                    fab
                    x-large
                    dark
                    @click="goToPage(calculator.path)"
                  >
                    <v-icon>mdi-calculator-variant</v-icon>
                  </v-btn>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    calculators: [
      {
        id: 0,
        cols: 12,
        name: 'ИМТ',
        path: '/BMI',
        description:
          {
            text: 'Величина, позволяющая оценить степень соответствия массы человека и его роста и тем самым косвенно судить о том, является ли масса недостаточной, нормальной или избыточной.',
            show: false
          }
      },
      {
        id: 1,
        cols: 12,
        name: 'Дата декрета',
        path: '/DateDecree',
        description:
          {
            text: 'Продолжительность декретного отпуска по беременности и родам – от 126 до 140 календарных дней. Точное количество дней зависит от того, как протекает беременность и проходят роды.',
            show: false
          }
      },
      {
        id: 4,
        cols: 12,
        name: 'Срок беременности по месячным',
        path: '/GestationalAgeByMenstruation',
        description:
          {
            text: 'Беременность длится 40 недель, то есть десять акушерских месяцев или девять календарных.',
            show: false
          }
      },
      {
        id: 5,
        cols: 12,
        name: 'Срок беременности по УЗИ',
        path: '/GestationalAgeByUltrasound',
        description:
          {
            text: 'Срок беременности определяется по УЗИ только в период до 10-12 недель. После этого рубикона каждый малыш развивается индивидуально и по конкретным размерам сделать это уже практически невозможно.',
            show: false
          }
      },
      {
        id: 2,
        cols: 12,
        name: 'Явки в ЖК',
        path: '/DatesVisitingAntenatalClinic',
        description:
          {
            text: 'Все беременные находятся под диспансерным наблюдением; в среднем женщина в течение беременности должна посетить женскую консультацию 13-14 раз.',
            show: false
          }
      },
      {
        id: 3,
        cols: 12,
        name: 'ПДР',
        path: '/EstimatedDateBirth',
        description:
          {
            text: 'Акушерский ПДР рассчитывается по дате последней менструации. Для этого применяют формулу Негеле: от первого дня последних месячных отнимают три месяца и прибавляют 7 дней, получается срок ровно в 40 недель.',
            show: false
          }
      },
      {
        id: 6,
        cols: 12,
        name: 'УЗИ скрининг',
        path: '/UltrasoundScreening',
        description:
          {
            text: 'Скрининг при беременности — это комплекс обследований, в который входят бесплатное плановое УЗИ и биохимический анализ венозной крови на гормоны. Скрининг проводят трижды — в первом, втором и третьем триместре. В Беларуси обязательным является лишь бесплатное плановое УЗИ-обследование беременных женщин.',
            show: false
          }
      }
    ],
    drawer: false,
    overlay: true,
    snackbar: false,
    time: ''
  }),

  beforeCreate () {
    this.$vuetify.theme.dark = JSON.parse(localStorage.getItem('darkTheme') || false)
  },

  mounted () {
    // в основном для сборки electron
    document.getElementsByTagName('html')[0].classList.add('scrollbar-hidden')

    setTimeout(() => {
      this.overlay = false
      this.$router.replace('/')
      // this.$store.dispatch('checkLicenseTime')

      //   if (this.$store.getters.isLicenseExpiring) {
      //     this.$router.replace('/')
      //   } else {
      //     this.$router.replace('/LicenseExpiring')
      //   }
    }, 2000)
  },

  methods: {

    goToPage (path) {
      // this.$store.dispatch('checkLicenseTime')
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    }

    // openSnackbar () {
    //   this.snackbar = !this.snackbar
    //   this.nextTime()
    //   let time
    //   if (this.snackbar) {
    //     time = setInterval(this.nextTime, 1000)
    //     setTimeout(function () {
    //       clearInterval(time)
    //     }, 5000)
    //   } else {
    //     clearInterval(time)
    //   }
    // },

    // nextTime () {
    //   const now = new Date()
    //   const ExpiringTimeLicense = new Date(2021, 6, 26, 18)
    //   const timeDifference = ExpiringTimeLicense - now
    //   const day = Math.trunc(timeDifference / 24 / 60 / 60 / 1000)
    //   const td = timeDifference - day * 24 * 60 * 60 * 1000
    //   const hours = Math.trunc(td / 60 / 60 / 1000)
    //   const dh = td - hours * 60 * 60 * 1000
    //   const minutes = Math.trunc(dh / 60 / 1000)
    //   const hm = dh - minutes * 60 * 1000
    //   const seconds = Math.trunc(hm / 1000)
    //   this.time = day + 'Д ' + hours + ':' + minutes + ':' + seconds
    // }
  }
}
</script>

<style lang="scss" scoped>

.c-app-bar {
  z-index: 11!important;
}

.btn-help-circle {
  position: absolute;
  transform: scale(0.75);
  top: -9px;
  left: -9px;
}
.theme--dark.btn-help-circle {
  color: rgba(255, 255, 255, 0.46)!important;
}

</style>
