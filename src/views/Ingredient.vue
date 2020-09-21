<template>
    <div class="card">
        <div v-if="item !== null" class="card-content">
            <div class="row">
                <div class="col-4 text-left">
                    <img :src="item.photo" :alt="item.name" class="img-thumbnail">
                </div>
                <div class="col-6 p-0">
                    <p class="item-title">{{ item.name }}</p>
                        <div class="actions" v-if="mode === 'controls'">
                            <button @click="minus" class="btn btn-outline-secondary btn-sm rounded minus">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input class="form-control quantity" readonly :value="quantity + 'g'">
                            <button @click="plus" class="btn btn-outline-secondary btn-sm rounded plus">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                </div>
                <div class="col-2 text-right">
                    <button data-test="add-item" v-if="mode === 'view'" @click="toggleItem" :class="selected ? 'btn btn-outline-success btn-sm rounded done' : 'btn btn-outline-secondary btn-sm rounded plus'">
                        <i :class="selected ? 'fas fa-check' : 'fas fa-plus'"></i>
                    </button>
                    <button v-if="mode === 'controls'" @click="remove" class="btn btn-outline-danger btn-sm rounded times">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="row" v-if="mode === 'view'">
                <div class="col-6 text-left nutrition">
                    <p>Carboidratos: <span class="dv">{{ carbohydrates.dv }}%</span> | <span class="value">{{ carbohydrates.value }}g</span> </p>
                    <p>Proteínas: <span class="dv">{{ proteins.dv }}%</span> | <span class="value">{{ proteins.value }}g</span> </p>
                </div>
                <div class="col-6 text-right nutrition">
                    <p>Gorduras: <span class="dv">{{ fats.dv }}%</span> | <span class="value">{{ fats.value }}g</span> </p>
                    <p>Calorias: <span class="dv">{{ calories.value }}kcal</span> </p>
                </div>
            </div>
            <div v-if="mode === 'controls'" class="nutrition-table">
                <table class="table table-striped">
                    <tr>
                        <td class="description text-left">Carboidratos</td>
                        <td>{{ carbohydrates.dv }}%</td>
                        <td class="text-right">{{ carbohydrates.value * (quantity/factor) }}g</td>
                    </tr>
                    <tr>
                        <td class="description text-left">Proteínas</td>
                        <td>{{ proteins.dv }}%</td>
                        <td class="text-right">{{ proteins.value * (quantity/factor) }}g</td>
                    </tr>
                    <tr>
                        <td class="description text-left">Gorduras</td>
                        <td>{{ fats.dv }}%</td>
                        <td class="text-right">{{ fats.value * (quantity/factor) }}g</td>
                    </tr>
                    <tr>
                        <td class="description text-left">Calorias</td>
                        <td></td>
                        <td class="text-right">{{ calories.value * (quantity/factor) }}kcal</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    name: 'Ingredient',
    data() {
        return {
            item: null,
            quantity: 50,
            factor: 50,
            selected: false,
            carbohydrates: {},
            fats: {},
            proteins: {},
            calories: {}
        };
    },
    props: {
        ingredient: {
            type: Object
        },
        mode: {
            type: String,
            default: 'controls'
        }
    },
    watch: {
        ingredient(item) {
            this.item = item;
        },
    },
    methods: {
        toggleItem() {
            if(this.selected) {
                this.selected = false;
                this.$emit('itemUnchecked');

                return;
            }

            this.selected = true;
            this.$emit('itemChecked', this.item);
        },
        remove() {
            this.$emit('remove');
        },
        plus() {
            this.quantity += 50;
            this.$emit('updateQuantity',  this.quantity / this.factor);
        },
        minus() {
            if(this.quantity === 50) return;

            this.quantity -= 50;
            this.$emit('updateQuantity',  this.quantity / this.factor);
        },
    },
    mounted() {
        if(this.mode === 'view') this.selected = false;
        if(this.ingredient === null) return;

        this.item = this.ingredient;

        this.item.nutritionFacts.forEach(n => {
            if(n.name === 'Carboidratos') this.carbohydrates = n;
            if(n.name === 'Proteínas') this.proteins = n;
            if(n.name === 'Calorias') this.calories = n;
            if(n.name === 'Gorduras') this.fats = n;
        });
    }
}
</script>

<style>
    .card {
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100px;
        border-radius: 0px;
        border: 0;        
    }

    .img-thumbnail {
        border-radius: 100%;
        max-height: 90px;
    }

    .card-content {
        text-align: center;
        width: 100%;
    }

    .item-title {
        font-size: 1em;
        text-align: left;
        padding-top: 0.5em;
    }

    .nutrition {
        margin-top: 1em;
        font-size: 0.8em;
        color: #565d70;
    }

    .nutrition p {
        margin-bottom: 0.2em;
        color: #aaaaaa;
    }

    .nutrition .dv {
        color: #333333;
    }

    .nutrition .value {
        color: #00e2a5;
    }

    .form-control.quantity {
        margin: 0 1em;
        font-size: 0.8em;
        display: inline-block;
        max-width: 80px;
        text-align: center;
    }

    .rounded {
        border-radius: 100% !important;
    }

    .minus, .plus, .done {
        font-size: 0.5em;
        padding: 0.01em 1em;
        height: 25px;
        width: 25px;
    }

    .minus, .plus {
        margin-top: 0.4em;
    }

    .times {    
        position: absolute;
        right: 1.25em;
        padding: 0.2em 0.6em;
        top: 3.5em;
    }

    .actions {
        position: relative;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .btn-outline-success {
        border-color: #00e2a5;
        color: #00e2a5;
    }
</style>