<template>
    <div id="modal" :class="active ? 'show' : 'd-none'">
        <div id="modal-content">
            <div id="categories" v-if="active">
                <Category
                    v-for="(category, index) in categories" :key="index"
                    :show="index === 0" :category="category"
                    @itemChecked="itemChecked" @itemUnchecked="itemUnchecked"
                ></Category>
            </div>
            <div id="close-modal">
                <button @click="closeModal" class="btn btn-danger rounded">
                    <i class="fas fa-times fa-lg"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Category from './Category.vue';

export default {
    name: 'AddIngredients',
    components: {
        Category
    },
    data() {
        return  {
            active: false,
            categories: [
                {
                    name: "Proteínas",
                    slug: "proteinas",
                    ingredients: [
                        {
                            id: 1,
                            name: "Filé Mignon Grelhado",
                            // Não se preocupe com a foto, todas podem ser placeholders
                            photo: "//placehold.it/256x256",
                            nutritionFacts: [
                                {
                                    name: "Carboidratos",
                                    value: 20,
                                    dv: 40,
                                },
                                {
                                    name: "Proteínas",
                                    value: 15,
                                    dv: 20,
                                },
                                {
                                    name: "Gorduras",
                                    value: 15,
                                    dv: 20,
                                },
                                {
                                    name: "Calorias",
                                    value: 1660,
                                },
                            ],
                        },
                        {
                            id: 2,
                            name: "Frango desfiado",
                            // Não se preocupe com a foto, todas podem ser placeholders
                            photo: "//placehold.it/256x256",
                            nutritionFacts: [
                                {
                                    name: "Carboidratos",
                                    value: 20,
                                    dv: 80,
                                },
                                {
                                    name: "Proteínas",
                                    value: 10,
                                    dv: 25,
                                },
                                {
                                    name: "Gorduras",
                                    value: 20,
                                    dv: 25,
                                },
                                {
                                    name: "Calorias",
                                    value: 1660,
                                },
                            ],
                        },
                    ]
                },
                {
                    name: "Carboidratos",
                    slug: "carboidratos",
                    ingredients: [
                        {
                            id: 1,
                            name: "Arroz à grega",
                            // Não se preocupe com a foto, todas podem ser placeholders
                            photo: "//placehold.it/256x256",
                            nutritionFacts: [
                                {
                                    name: "Carboidratos",
                                    value: 20,
                                    dv: 80,
                                },
                                {
                                    name: "Proteínas",
                                    value: 10,
                                    dv: 25,
                                },
                                {
                                    name: "Gorduras",
                                    value: 20,
                                    dv: 25,
                                },
                                {
                                    name: "Calorias",
                                    value: 1660,
                                },
                            ],
                        },
                    ]
                },
            ]
        }
    },
    props: {
        show: {
            type: Boolean
        }
    },
    watch: {
        show(val) {
            this.active = val;
        }
    },
    methods: {
        itemChecked(item) {
            this.$emit('itemChecked', item);
        },
        itemUnchecked() {
            this.$emit('itemUnchecked');            
        },
        closeModal() {
            this.$emit('closeModal');
        }
    }
}
</script>

<style>
    #modal {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #565d70;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #modal-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    #categories {
        height: 80%;
        overflow: auto;
    }

    #close-modal {
        height: 20%;
        width: 100%;
        text-align: center;
        padding: 10%;
    }

    #close-modal button {
        padding: 0.7em 0.8em; 
        line-height: 1.1em;
    }
</style>