<template>
  <v-card
    class="calculator-page"
  >
    <calculator-title
      title-text="Индекс массы тела">
    </calculator-title>
    <v-divider/>
    <v-card-actions>
      <v-container
        fluid
      >
        <v-row
          dense
        >
          <v-col
            cols="6"
          >
            <v-text-field
              v-model.number="$v.weight.$model"
              label="Масса тела"
              type="number"
              suffix="кг"
              :error-messages="weightErrorMsg"
              @input="delayTouch($v.weight)"
              clearable
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col
            cols="6"
          >
            <v-text-field
              v-model.number="$v.height.$model"
              label="Рост"
              type="number"
              suffix="м|cм"
              :error-messages="heightErrorMsg"
              @input="delayTouch($v.height)"
              clearable
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row
          dense
        >
          <v-col
            cols="12"
          >
            <v-btn
              :disabled="disableAnswer"
              style="color: white"
              block
              x-large
              class="btn-bmi"
              :color="colorTextArea"
            >
              {{messagesTextArea}}
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          dense
        >
          <v-col
            cols="12"
          >
            <v-btn
              :disabled="disableAnswer"
              block
              x-large
              class="btn-answer"
              color="primary"
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

import { required, between, or } from 'vuelidate/lib/validators'
import CalculatorTitle from '../components/calculatorTitle'

const touchMap = new WeakMap()

export default {
  name: 'BodyMassIndex',
  components: { CalculatorTitle },
  data: () => ({
    weight: '',
    height: '',
    answer: 0,
    disableAnswer: true
  }),

  validations: {
    weight: {
      required,
      between: between(1, 635)
    },
    height: {
      required,
      between: or(between(0.22, 3), between(22, 300))
    }
  },

  computed: {

    weightErrorMsg () {
      if (this.$v.weight.$error) {
        if (!this.$v.weight.between) return 'Невозможный вес'
      }
      return ''
    },

    heightErrorMsg () {
      if (this.$v.height.$error) {
        if (!this.$v.height.between) return 'Невозможный рост'
      }
      return ''
    },

    messagesTextArea () {
      if (this.answer === 0) return 'Оценка ИМТ'
      if (this.answer < 16) return 'Дефицит массы'
      if (this.answer < 18.5) return 'Недостаточная масса'
      if (this.answer < 25) return 'Норма'
      if (this.answer < 30) return 'Избыточная масса'
      if (this.answer < 35) return 'Ожирение 1 степени'
      if (this.answer < 40) return 'Ожирение 2 степени'
      if (this.answer >= 40) return 'Ожирение 3 степени'
      return 'Оценка ИМТ'
    },

    colorTextArea () {
      if (this.answer < 16) return '#1976D2' // 'blue darken-2'
      if (this.answer < 18.5) return '#0097A7' // 'cyan darken-2'
      if (this.answer < 25) return '#4CAF50' // 'green'
      if (this.answer < 30) return '#FBC02D' // 'yellow darken-2'
      if (this.answer < 35) return '#FFA000' // 'amber darken-2'
      if (this.answer < 40) return '#FF6D00' // 'orange accent-4'
      if (this.answer >= 40) return '#D50000' // red accent-4
      return ''
    }
  },

  methods: {
    checkAnswer () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.height > 3) {
          this.answer = (this.weight / Math.pow(this.height / 100, 2)).toFixed(2)
        } else {
          this.answer = (this.weight / Math.pow(this.height, 2)).toFixed(2)
        }
        this.disableAnswer = false
      } else {
        this.disableAnswer = true
        this.answer = 0
      }
    },

    delayTouch ($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
        this.disableAnswer = true
        this.answer = 0
      }
      touchMap.set($v, setTimeout(this.checkAnswer, 1000))
    }
  }
}
</script>

<style scoped>

</style>
