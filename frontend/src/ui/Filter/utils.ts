import { h } from "vue";
import {
  Select,
  TextInput,
  Rating,
  DatePicker,
  DateRangePicker,
  DateTimePicker,
} from "frappe-ui";

const typeCheck = ["Check"];
const typeLink = ["Link", "Dynamic Link"];
const typeNumber = ["Float", "Int", "Currency", "Percent"];
const typeSelect = ["Select"];
const typeString = ["Data", "Long Text", "Small Text", "Text Editor", "Text"];
const typeDate = ["Date", "Datetime"];
const typeRating = ["Rating"];

const baseOperators = [
  { label: "Equals", value: "equals" },
  { label: "Not Equals", value: "not equals" },
  { label: "Like", value: "like" },
  { label: "Not Like", value: "not like" },
  { label: "In", value: "in" },
  { label: "Not In", value: "not in" },
  { label: "Is", value: "is" },
];

const comparisonOperators = [
  { label: "<", value: "<" },
  { label: ">", value: ">" },
  { label: "<=", value: "<=" },
  { label: ">=", value: ">=" },
];

const likeOperators = [
  { label: "Like", value: "like" },
  { label: "Not Like", value: "not like" },
  { label: "Is", value: "is" },
];

export const getOperators = (fieldtype: string, fieldname: string) => {
  if (fieldname === "_assign") return likeOperators;

  if (typeNumber.includes(fieldtype)) {
    return [...baseOperators, ...comparisonOperators];
  }

  if (
    typeString.includes(fieldtype) ||
    typeSelect.includes(fieldtype) ||
    typeLink.includes(fieldtype)
  ) {
    return baseOperators;
  }

  if (typeCheck.includes(fieldtype)) {
    return [{ label: "Equals", value: "equals" }];
  }

  if (["Duration"].includes(fieldtype)) {
    return [
      { label: "Like", value: "like" },
      { label: "Not Like", value: "not like" },
      { label: "In", value: "in" },
      { label: "Not In", value: "not in" },
      { label: "Is", value: "is" },
    ];
  }

  if (typeDate.includes(fieldtype)) {
    return [
      { label: "Equals", value: "equals" },
      { label: "Not Equals", value: "not equals" },
      { label: "Is", value: "is" },
      ...comparisonOperators,
      { label: "Between", value: "between" },
      { label: "Timespan", value: "timespan" },
    ];
  }

  if (typeRating.includes(fieldtype)) {
    return [
      { label: "Equals", value: "equals" },
      { label: "Not Equals", value: "not equals" },
      { label: "Is", value: "is" },
      ...comparisonOperators,
    ];
  }
};

export const timespanOptions = [
  { label: "Last Week", value: "last week" },
  { label: "Last Month", value: "last month" },
  { label: "Last Quarter", value: "last quarter" },
  { label: "Last 6 Months", value: "last 6 months" },
  { label: "Last Year", value: "last year" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "This Week", value: "this week" },
  { label: "This Month", value: "this month" },
  { label: "This Quarter", value: "this quarter" },
  { label: "This Year", value: "this year" },
  { label: "Next Week", value: "next week" },
  { label: "Next Month", value: "next month" },
  { label: "Next Quarter", value: "next quarter" },
  { label: "Next 6 Months", value: "next 6 months" },
  { label: "Next Year", value: "next year" },
];

export const getValueControl = (f) => {
  const { field, operator } = f;
  const {  fieldType } = field;

	console.log(fieldType, 'bruh')

  if (operator === "is") {
    return h(Select, {
      options: [
        { label: "Set", value: "set" },
        { label: "Not Set", value: "not set" },
      ],
    });
  }

  if (operator === "timespan") {
    return h(Select, { options: timespanOptions });
  }

  if (["like", "not like", "in", "not in"].includes(operator)) {
    return h(TextInput);
  }

  if (typeSelect.includes(fieldType) || typeCheck.includes(fieldType)) {
    return h(Select, { options: [] });
  }

  if (typeLink.includes(fieldType)) {
    if (fieldType === "Dynamic Link") {
      return h(TextInput);
    }
    return h(TextInput);
    // todo
    // return h(Link, { class: "form-control", doctype: options, value: f.value });
  }

  if (typeNumber.includes(fieldType)) {
    return h(TextInput, { type: "number" });
  }

  if (typeDate.includes(fieldType) && operator === "between") {
    return h(DateRangePicker, { value: f.value, iconLeft: "" });
  }

  if (typeDate.includes(fieldType)) {
    return h(fieldType === "Date" ? DatePicker : DateTimePicker, {
      value: f.value,
      iconLeft: "",
    });
  }

  if (typeRating.includes(fieldType)) {
    return h(Rating, {
      rating: f.value || 0,
      static: false,
      // "onUpdate:modelValue": (v) => updateValue(v, f),
    });
  }

  return h(TextInput);
};
