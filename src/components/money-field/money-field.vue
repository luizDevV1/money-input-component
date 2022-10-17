<template>
  <div class="field-money">
    <span>Campo monetário</span>
    <input datatype="currency"
           ref="money_field"
           class="money-input"
           :value="format_to_money(value_field)"
           @blur="blur_remove_money_mask"
           @keyup="key_up_format_money"
           @keydown="key_down_validate_type"
    />
    <b>
      Valor quando evento de "blur" e ativado = {{ value_field }}
    </b>
  </div>
</template>

<script lang="ts" type="module" src="./money-field.ts"/>

<style lang="css" scoped>
.field-money {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #05054b;
  border: 2px solid #B8860BFF;
  padding: 8px;
  border-radius: 8px;
}

span {
  color: #fff;
  font-size: 20px;
}

b {
  color: #B8860BFF;
  margin: 8px auto;
  font-size: 12px;
}

.money-input {
  outline: none;
  height: 45px;
  width: 350px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
}

.money-input::before {
  content: 'R$' !important;
  font-weight: bold;
  color: #000;
}
</style>
