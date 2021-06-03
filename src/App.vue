<template>
  <v-app>
    <v-overlay
      style="z-index: 14"
      :color="this.$vuetify.theme.dark ? 'black' : 'white'"
      opacity="1"
      :value="overlay"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-app-bar
      class="c-app-bar"
      app
      color="primary"
      dark
      :prominent="this.$route.path === '/'"
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
      <v-btn @click="changeDarkTheme"
             color="primary"
             icon>
        <v-icon v-if="$vuetify.theme.dark">mdi-brightness-7</v-icon>
        <v-icon v-else>mdi-brightness-4</v-icon>
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
            <v-card>
              <v-card-text>
                <v-row dense align="center">
                  <v-col class="text-h6 text--primary">
                    {{calculator.name}}
                    <v-dialog
                      v-model='calculator.description.show'
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          small
                          fab
                          :ripple="{ class: 'primary--text'}"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-information-outline</v-icon>
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
                  </v-col>
                  <v-btn
                    color="primary"
                    fab
                    x-large
                    dark
                    @click="$router.push(calculator.path)"
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
    overlay: true
  }),

  beforeCreate () {
    this.$vuetify.theme.dark = JSON.parse(localStorage.getItem('darkTheme') || false)
  },

  mounted () {
    setTimeout(() => {
      this.$router.replace('/')
      this.overlay = false
      // TODO не забывать перед сборкой ставить 2000
    }, 2000)
  },

  methods: {
    changeDarkTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('darkTheme', this.$vuetify.theme.dark)
    }
  }
}
</script>

<style lang="scss" scoped>

.c-app-bar {
  z-index: 11!important;
}

</style>
