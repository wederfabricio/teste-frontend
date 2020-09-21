<template>
    <div id="category-container">
        <p @click="opened = !opened" class="name">
            {{ category.name }} <i :class="opened ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        </p>
        <div v-if="opened" class="items">
            <Ingredient class="ingredient" v-for="(ingredient, index) in category.ingredients" :key="index" :ingredient="ingredient" :mode="'view'" @itemChecked="itemChecked" @itemUnchecked="itemUnchecked"></Ingredient>
        </div>
    </div>
</template>

<script>
import Ingredient from './Ingredient.vue';

export default {
    name: 'Category',
    components: {
        Ingredient
    },
    data() {
        return {
            opened: false
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        category: {
            type: Object,
            required: true
        }
    },
    methods: {
        itemChecked(item) {
            this.$emit('itemChecked', item);
        },
        itemUnchecked() {
            this.$emit('itemUnchecked');
        }
    },
    mounted() {
        this.opened = this.show;
    }
}
</script>

<style>
    #category-container {
        margin-bottom: 0.2em;
    }

    .name {
        position: relative;
        cursor: pointer;
        width: 100%;
        font-size: 1.5em;
        padding: 0.5em;
        background-color: #00e2a5;
        color: white;
        text-align: center;
        margin-bottom: 0;
    }

    .name i {
        position: absolute;
        top: 50%;
        right: 20%;
        margin-top: -0.5em;
    }

    .ingredient {
        margin-bottom: 0.1em;
    }

    .ingredient:last-child {
        margin-bottom: 0;
    }
</style>