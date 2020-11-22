<template>
  <div
    class="el-autocomplete"
    v-clickoutside="close"
    aria-haspopup="listbox"
    role="combobox"
    :aria-expanded="suggestionVisible"
    :aria-owns="id"
  >
    <el-input
      ref="input"
      v-bind="[$props, $attrs]"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
      @keydown.up.native.prevent="highlight(highlightedIndex - 1)"
      @keydown.down.native.prevent="highlight(highlightedIndex + 1)"
      @keydown.enter.native="handleKeyEnter"
      @keydown.native.tab="close"
    >
      <template slot="prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append" v-if="$slots.append">
        <slot name="append"></slot>
      </template>
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </template>
    </el-input>
    <el-autocomplete-suggestions
      visible-arrow
      :class="[popperClass ? popperClass : '']"
      :popper-options="popperOptions"
      :append-to-body="popperAppendToBody"
      ref="suggestions"
      :placement="placement"
      :id="id"
    >
      <li
        v-for="(item, index) in suggestions"
        :key="index"
        :class="{ highlighted: highlightedIndex === index }"
        @click="select(item)"
        :id="`${id}-item-${index}`"
        role="option"
        :aria-selected="highlightedIndex === index"
      >
        <slot :item="item">
          {{ item[valueKey] }}
        </slot>
      </li>
    </el-autocomplete-suggestions>
  </div>
</template>
<style lang="scss">
@import "../../theme-chalk/src/autocomplete.scss";
</style>
