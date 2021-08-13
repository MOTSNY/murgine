<!-- @author Mitskevich Yauheni -->
<template>
  <v-card
    class="calculator-page"
  >
    <calculator-title
      title-text="Срок беременности по последнему дню УЗИ"
    ></calculator-title>
    <v-divider/>
    <v-card-actions>
      <v-container fluid>
        <v-row
          dense
        >
          <v-col
            cols="12"
          >
            <v-dialog
              ref="dialog"
              v-model="dialog"
              :return-value.sync="lastUltrasound"
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="computedDateFormatted"
                  label="Дата последнего УЗИ"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  clearable
                  v-bind="attrs"
                  v-on="on"
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                color="primary"
                show-adjacent-months
                v-model="lastUltrasound"
                :max="new Date(Date.now() + 4*366*24*60*60*1000).toISOString().substr(0, 10)"
                :min="new Date(Date.now() - 4*366*24*60*60*1000).toISOString().substr(0, 10)"
                locale="ru-ru"
                @change="checkAnswer"
              ></v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row
          dense
        >
          <v-col
            cols="6"
          >
            <v-text-field
              v-model.number="$v.weeks.$model"
              label="Недели"
              type="number"
              :error-messages="weeksErrorMsg"
              @input="delayTouch($v.weeks)"
              clearable
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col
            cols="6"
          >
            <v-text-field
              v-model.number="$v.days.$model"
              label="Дни"
              type="number"
              :error-messages="daysErrorMsg"
              @input="delayTouch($v.days)"
              clearable
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col
            cols="12"
          >
            <v-btn
              :disabled="disableAnswer"
              block
              x-large
              class="btn-answer"
              color="primary"
              @click="changeViewAnswer"
            >
              {{answer}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import CalculatorTitle from '../components/calculatorTitle'
import { integer, minValue, required } from 'vuelidate/lib/validators'

const touchMap = new WeakMap()

export default {
  name: 'GestationalAgeByUltrasound',
  components: { CalculatorTitle },

  data: () => ({
    weeks: null,
    days: null,
    lastUltrasound: null,
    dialog: false,
    answer: '',
    disableAnswer: true
  }),

  validations: {
    lastUltrasound: {
      required
    },
    weeks: {
      integer,
      minValue: minValue(0)
    },
    days: {
      integer,
      minValue: minValue(0)
    }
  },

  mounted () {
    this.answer = this.$store.getters.getViewAnswer ? 'Д:0' : 'Н:0 Д:0'
  },

  computed: {

    nullViewAnswer () {
      return this.$store.getters.getViewAnswer ? 'Д:0' : 'Н:0 Д:0'
    },

    weeksErrorMsg () {
      if (this.$v.weeks.$error) {
        if (!this.$v.weeks.integer) return 'Используйте целые числа'
        if (!this.$v.weeks.minValue) return 'Отрицательное число'
      }
      return ''
    },

    daysErrorMsg () {
      if (this.$v.days.$error) {
        if (!this.$v.days.integer) return 'Используйте целые числа'
        if (!this.$v.days.minValue) return 'Отрицательное число'
      }
      return ''
    },

    computedDateFormatted: {
      get: function () {
        return this.formatDate(this.lastUltrasound)
      },
      set: function (value) {
        this.lastUltrasound = value
        this.disableAnswer = true
        this.answer = this.nullViewAnswer
      }
    }
  },

  watch: {
    dialog (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },

  methods: {
    checkAnswer () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$refs.dialog.save(this.lastUltrasound)
        this.viewAnswer()
      } else {
        this.disableAnswer = true
        this.answer = this.nullViewAnswer
      }
    },

    viewAnswer () {
      this.disableAnswer = false
      const answer = Math.ceil((Date.now() - Date.parse(this.lastUltrasound)) / (1000 * 60 * 60 * 24)) + this.weeks * 7 + this.days
      if (this.$store.getters.getViewAnswer) {
        this.answer = 'Д:' + answer
      } else {
        this.answer = 'Н:' + Math.floor(answer / 7) + ' Д:' + Math.ceil(answer - Math.floor(answer / 7) * 7)
      }
    },

    changeViewAnswer () {
      this.$store.commit('viewAnswer', !this.$store.getters.getViewAnswer)
      this.checkAnswer()
    },

    delayTouch ($v) {
      $v.$reset()
      this.disableAnswer = true
      this.answer = this.nullViewAnswer
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout(this.checkAnswer, 1000))
    },

    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    }
  }
}
</script>

<style scoped>

</style>
