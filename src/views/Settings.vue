<!-- @author Mitskevich Yauheni -->
<template>
  <v-card
    class="calculator-page"
  >
    <calculator-title
      title-text="Настройки"
    ></calculator-title>
    <v-divider/>
    <v-card-actions id="settings">
      <v-container fluid>
        <v-row
          dense
        >
          <v-col>
            <v-card class="elevation-3">
              <v-card-text>
                <v-row dense align="center">
                  <v-col class="text-h6 text--primary">
                    Тёмная тема
                  </v-col>
                  <v-switch
                    v-model="$vuetify.theme.dark"
                    color="primary"
                    @change="saveDarkTheme"
                  ></v-switch>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row
          dense
        >
          <v-col>
            <v-card class="elevation-3">
              <v-card-text>
                <v-row dense align="center">
                  <v-col class="text-h6 text--primary">
                    Редактор недель для явок в ЖК
                  </v-col>
                </v-row>
                <v-row dense align="center">
                  <v-col class="text--primary">
                    <v-dialog
                      v-model='dialogEdit'
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-chip-group
                          column
                          active-class="primary--text"
                        >
                          <v-chip
                            outlined
                            v-for="(weekVisit, index) in weeksVisits"
                            :key="index"
                            v-bind="attrs"
                            v-on="on"
                            @click="transferToDialog(index)"
                          >
                            {{ Array.isArray(weekVisit) ? weekVisit[0] + ' - ' + weekVisit[1] : weekVisit }}
                            <v-icon color="primary" right>
                              mdi-pencil
                            </v-icon>
                          </v-chip>
                        </v-chip-group>
                      </template>
                      <v-card>
                        <v-card-title>
                          Редактор недель
                        </v-card-title>
                        <v-card-text>
                          <v-row dense>
                            <v-col>
                              <v-text-field
                                v-model.number="$v.firstWeek.$model"
                                :label="isInterval ? 'С ' + firstWeek + ' недели' : firstWeek + ' Неделя'"
                                type="number"
                                clearable
                                outlined
                                :error-messages="firstWeekErrorMsg"
                                @click:clear="clearFirstWeek"
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row dense>
                            <v-col>
                              <v-text-field
                                v-if="isInterval"
                                v-model.number="$v.secondWeek.$model"
                                :label="'По ' + secondWeek + ' неделю'"
                                type="number"
                                clearable
                                outlined
                                :error-messages="secondWeekErrorMsg"
                                @click:clear="clearSecondWeek"
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row dense align="center">
                            <v-col class="text-body-1 text--primary">
                              Промежуток недель
                            </v-col>
                            <v-switch
                              v-model="isInterval"
                              color="primary"
                            ></v-switch>
                          </v-row>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn
                            color="red"
                            text
                            @click="deleteWeeks"
                          >
                            Удалить
                          </v-btn>
                          <v-spacer/>
                          <v-btn
                            color="primary"
                            @click="saveEditWeeks"
                          >
                            Сохранить
                          </v-btn>
                          <v-btn
                            color="primary"
                            text
                            @click="dialogEdit = false"
                          >
                            Назад
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-dialog
                  v-model='dialogCreate'
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      block
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Добавить
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      Добавить недели
                    </v-card-title>
                    <v-card-text>
                      <v-row dense>
                        <v-col>
                          <v-text-field
                            v-model.number="$v.firstWeek.$model"
                            :label="isInterval ? 'С ' + firstWeek + ' недели' : firstWeek + ' Неделя'"
                            type="number"
                            clearable
                            outlined
                            :error-messages="firstWeekErrorMsg"
                            @click:clear="clearFirstWeek"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <v-text-field
                            v-if="isInterval"
                            v-model.number="$v.secondWeek.$model"
                            :label="'По ' + secondWeek + ' неделю'"
                            type="number"
                            clearable
                            outlined
                            :error-messages="secondWeekErrorMsg"
                            @click:clear="clearSecondWeek"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense align="center">
                        <v-col class="text-body-1 text--primary">
                          Промежуток недель
                        </v-col>
                        <v-switch
                          v-model="isInterval"
                          color="primary"
                        ></v-switch>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer/>
                      <v-btn
                        color="primary"
                        @click="saveNewWeeks"
                      >
                        Сохранить
                      </v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="dialogCreate = false"
                      >
                        Назад
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators'
import CalculatorTitle from '../components/calculatorTitle'
export default {
  name: 'Settings',
  components: { CalculatorTitle },

  data: () => ({
    dialogEdit: false,
    dialogCreate: false,
    firstWeek: '',
    secondWeek: '',
    isInterval: false,
    indexVisit: null
  }),

  validations () {
    if (this.isInterval) {
      return {
        firstWeek: {
          required,
          numeric,
          order: function () {
            return this.secondWeek - this.firstWeek > 0
          }
        },
        secondWeek: {
          required,
          numeric,
          order: function () {
            return this.secondWeek - this.firstWeek > 0
          }
        }
      }
    } else {
      return {
        firstWeek: {
          required,
          numeric
        }
      }
    }
  },

  computed: {

    firstWeekErrorMsg () {
      if (this.$v.firstWeek.$error) {
        if (this.isInterval) {
          if (!this.$v.firstWeek.order) return 'Не правильный порядок'
        }
        if (!this.$v.firstWeek.numeric) return 'Используйте целые числа'
        if (!this.$v.firstWeek.required) return 'Пустое поле'
      }
      return ''
    },

    secondWeekErrorMsg () {
      if (this.$v.secondWeek.$error) {
        if (!this.$v.secondWeek.order) return 'Не правильный порядок'
        if (!this.$v.secondWeek.numeric) return 'Используйте целые числа'
        if (!this.$v.secondWeek.required) return 'Пустое поле'
      }
      return ''
    },

    weeksVisits () {
      return this.$store.getters.getWeeksVisits
    }

  },

  watch: {
    dialogEdit (value) {
      if (!value) {
        this.clearDialog()
      }
    },
    dialogCreate (value) {
      if (!value) {
        this.clearDialog()
      }
    }
  },

  methods: {

    saveDarkTheme () {
      localStorage.setItem('darkTheme', this.$vuetify.theme.dark)
    },

    transferToDialog (index) {
      this.indexVisit = index
      if (Array.isArray(this.weeksVisits[index])) {
        this.firstWeek = this.weeksVisits[index][0]
        this.secondWeek = this.weeksVisits[index][1]
        this.isInterval = true
      } else {
        this.firstWeek = this.weeksVisits[index]
        this.isInterval = false
      }
    },

    saveNewWeeks () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.isInterval) {
          const arrWeeks = [this.firstWeek, this.secondWeek]
          this.weeksVisits.push(arrWeeks)
        } else {
          this.weeksVisits.push(this.firstWeek)
        }
        this.$store.commit('weeksVisits', this.weeksVisits)
        this.clearDialog()
      }
    },

    saveEditWeeks () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.isInterval) {
          const arrWeeks = [this.firstWeek, this.secondWeek]
          this.weeksVisits.splice(this.indexVisit, 1, arrWeeks)
        } else {
          this.weeksVisits.splice(this.indexVisit, 1, this.firstWeek)
        }
        this.$store.commit('weeksVisits', this.weeksVisits)
        this.clearDialog()
      }
    },

    deleteWeeks () {
      this.weeksVisits.splice(this.indexVisit, 1)
      this.$store.commit('weeksVisits', this.weeksVisits)
      this.clearDialog()
    },

    clearDialog () {
      this.firstWeek = ''
      this.secondWeek = ''
      this.isInterval = false
      this.dialogEdit = false
      this.dialogCreate = false
      this.$v.$reset()
    },

    clearFirstWeek () {
      window.setTimeout(() => {
        this.firstWeek = ''
      }, 0)
    },

    clearSecondWeek () {
      window.setTimeout(() => {
        this.secondWeek = ''
      }, 0)
    }

  }
}
</script>

<style lang="scss" scoped>

#settings.v-card__actions {
  padding: 0;
}

.v-input.v-input--selection-controls {
  margin: 0;
  height: 24px;
  padding: 0;
}

</style>
