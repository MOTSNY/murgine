<template>
  <v-card
    class="calculator-page"
  >
    <calculator-title
      title-text="Предположительная дата родов"
    ></calculator-title>
    <v-divider/>
    <v-card-actions>
      <v-container>
        <v-row
          dense
        >
          <v-col
            cols="12"
          >
            <v-dialog
              ref="dialog"
              v-model="dialog"
              :return-value.sync="lastMenstruation"
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="computedDateFormatted"
                  label="День последних месячных"
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
                v-model="lastMenstruation"
                :max="new Date(Date.now() + 4*366*24*60*60*1000).toISOString().substr(0, 10)"
                :min="new Date(Date.now() - 4*366*24*60*60*1000).toISOString().substr(0, 10)"
                locale="ru-ru"
                @change="checkAnswer"
              ></v-date-picker>
            </v-dialog>
          </v-col>
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
import CalculatorTitle from '../components/calculatorTitle'
export default {
  name: 'EstimatedDateBirth',
  components: { CalculatorTitle },
  data: () => ({
    dialog: false,
    answer: 'ДД.ММ.ГГГГ',
    disableAnswer: true
  }),

  mounted () {
    if (this.lastMenstruation !== null) {
      this.checkAnswer()
    }
  },

  computed: {

    lastMenstruation: {
      get: function () {
        return this.$store.getters.getLastMenstruation
      },
      set: function (value) {
        this.$store.commit('lastMenstruation', value)
      }
    },

    computedDateFormatted: {
      get: function () {
        return this.formatDate(this.lastMenstruation)
      },
      set: function (value) {
        this.lastMenstruation = value
        this.disableAnswer = true
        this.answer = 'ДД.ММ.ГГГГ'
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
      this.disableAnswer = false
      this.$refs.dialog.save(this.lastMenstruation)
      this.answer = this.formatDate(new Date(Date.parse(this.lastMenstruation) + 280 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10)) // +280 дней
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
