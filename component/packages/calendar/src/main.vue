<template>
  <div class="el-calendar">
    <div class="el-calendar__header">
      <div class="el-calendar__title">
        {{ i18nDate }}
      </div>
      <div class="el-calendar__button-group" v-if="validatedRange.length === 0">
        <el-button-group>
          <el-button type="plain" size="mini" @click="selectDate('prev-month')">
            {{ t("el.datepicker.prevMonth") }}
          </el-button>
          <el-button type="plain" size="mini" @click="selectDate('today')">
            {{ t("el.datepicker.today") }}
          </el-button>
          <el-button type="plain" size="mini" @click="selectDate('next-month')">
            {{ t("el.datepicker.nextMonth") }}
          </el-button>
        </el-button-group>
      </div>
    </div>
    <div
      class="el-calendar__body"
      v-if="validatedRange.length === 0"
      key="no-range"
    >
      <date-table
        :date="date"
        :selected-day="realSelectedDay"
        :first-day-of-week="realFirstDayOfWeek"
        @pick="pickDay"
      />
    </div>
    <div v-else class="el-calendar__body" key="has-range">
      <date-table
        v-for="(range, index) in validatedRange"
        :key="index"
        :date="range[0]"
        :selected-day="realSelectedDay"
        :range="range"
        :hide-header="index !== 0"
        :first-day-of-week="realFirstDayOfWeek"
        @pick="pickDay"
      />
    </div>
  </div>
</template>
<script>
import Locale from "element-ui/src/mixins/locale";
import fecha from "element-ui/src/utils/date";
import ElButton from "element-ui/packages/button";
import ElButtonGroup from "element-ui/packages/button-group";
import DateTable from "./date-table";
import { validateRangeInOneMonth } from "element-ui/src/utils/date-util";

const validTypes = ["prev-month", "today", "next-month"];
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const oneDay = 86400000;

export default {
  name: "ElCalendar",
  mixins: [Locale],
  components: {
    DateTable,
    ElButton,
    ElButtonGroup,
  },
  props: {
    value: [Date, String, Number],
    range: {
      type: Array,
      validator(range) {
        if (Array.isArray(range)) {
          return (
            range.length === 2 &&
            range.every(
              (item) =>
                typeof item === "string" ||
                typeof item === "number" ||
                item instanceof Date
            )
          );
        } else {
          return true;
        }
      },
    },
    firstDayOfWeek: {
      type: Number,
      default: 1,
    },
  },
  provide() {
    return {
      elCalendar: this,
    };
  },
  methods: {
    pickDay(day) {
      this.realSelectedDay = day;
    },
    selectDate(type) {
      if (validTypes.indexOf(type) === -1) {
        throw new Error(`invalid type ${type}`);
      }
      let day = "";
      if (type === "prev-month") {
        day = `${this.prevMonthDatePrefix}-01`;
      } else if (type === "next-month") {
        day = `${this.nextMonthDatePrefix}-01`;
      } else {
        day = this.formatedToday;
      }

      if (day === this.formatedDate) return;
      this.pickDay(day);
    },
    toDate(val) {
      if (!val) {
        throw new Error("invalid val");
      }
      return val instanceof Date ? val : new Date(val);
    },
  },
};
</script>
