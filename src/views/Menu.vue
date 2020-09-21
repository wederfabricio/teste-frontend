<template>
  <div>
      <div class="content">
          <h1 class="title">Montagem</h1>
          <h3 class="subtitle">Divisórias: {{ items.length.toString().padStart(2, '0') }}</h3>
      </div>
      <div class="content" v-for="(item, indexPartition) in items" :key="indexPartition">
          <p class="partition-title">{{indexPartition + 1}}ª Divisória</p>
          <Ingredient data-test="ingredient" v-for="(ingredient, indexIngredient) in item" :key="indexIngredient" :ingredient='ingredient' @remove="() => remove(indexPartition, indexIngredient)" @updateQuantity="(quantityFactor) => updateQuantity(indexPartition, indexIngredient, quantityFactor)"></Ingredient>
          <button data-test="add-partition-button" class="partition-button" @click="() => openModal(indexPartition)">
              <i class="fas fa-plus fa-lg"></i> Ingredientes
          </button>
      </div>      
      <div class="content">
            <p class="lead">Quantidade de refeições</p>
            <div class="meal-controls">
                <button data-test="minusMeal" @click="minus" class="btn btn-outline-secondary btn-sm rounded minus">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="lead" data-test="mealText">{{ meal }} {{ meal === 1 ? 'refeição' : 'refeições'}}</span>
                <button data-test="plusMeal" @click="plus" class="btn btn-outline-secondary btn-sm rounded plus">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
      </div>      
      <div class="content">
            <p class="lead">Valores totais</p>
            <div class="nutrition-table">
                <table class="table table-striped">
                    <tr>
                        <td class="description text-left">Carboidratos</td>
                        <td data-test="carbohydrates" class="text-right">{{ carbohydrates * meal }}g</td>
                    </tr>
                    <tr>
                        <td class="description text-left">Proteínas</td>
                        <td class="text-right">{{ proteins * meal }}g</td>
                    </tr>
                    <tr>
                        <td class="description text-left">Gorduras</td>
                        <td class="text-right">{{ fats * meal }}g</td>
                    </tr>
                    <tr>
                        <td class="description text-left">Calorias</td>
                        <td class="text-right">{{ calories * meal }}kcal</td>
                    </tr>
                </table>
            </div>
      </div>
      <AddIngredients :show="modal" @closeModal="closeModal"  @itemChecked="itemChecked" @itemUnchecked="itemUnchecked"></AddIngredients>      
  </div>
</template>

<script>
import Ingredient from './Ingredient.vue';
import AddIngredients from './AddIngredients.vue';

export default {
    name: "Menu",
    components: {
        Ingredient,
        AddIngredients
    },
    data() {
        return {
            items: [
                [],
                [],
                []
            ],
            meal: 1,
            indexSelected: -1,
            modal: false,
            carbohydrates: 0,
            calories: 0,
            fats: 0,
            proteins: 0
        }
    },
    methods: {
        openModal(index) {
            this.modal = true;
            this.indexSelected = index;
        },
        closeModal() {
            this.modal = false;
        },
        remove(indexPartition, indexIngredient) {
            this.items[indexPartition].splice(indexIngredient, 1);
            this.updateNutrition();
        },
        itemChecked(item) {
            item.quantityFactor = 1;
            this.items[this.indexSelected].push(item);
            this.updateNutrition();
        },
        itemUnchecked() {
            this.items[this.indexSelected].pop();
            this.updateNutrition();
        },
        updateQuantity(indexPartition, indexIngredient, quantityFactor) {
            this.$nextTick(() => {
                this.items[indexPartition][indexIngredient].quantityFactor = quantityFactor;
                this.updateNutrition();
            });            
        },
        plus() {
            this.meal += 1;
        },
        minus() {
            if(this.meal === 1) return;

            this.meal -= 1;
        },
        updateNutrition() {
            this.carbohydrates = 0;
            this.calories = 0;
            this.fats = 0;
            this.proteins = 0;

            this.items.forEach(partitions => {
                partitions.forEach(ingredient => {
                    this.carbohydrates += ingredient.nutritionFacts.find(n => n.name === "Carboidratos").value * ingredient.quantityFactor;
                    this.calories += ingredient.nutritionFacts.find(n => n.name === "Calorias").value * ingredient.quantityFactor;
                    this.fats += ingredient.nutritionFacts.find(n => n.name === "Gorduras").value * ingredient.quantityFactor;
                    this.proteins += ingredient.nutritionFacts.find(n => n.name === "Proteínas").value * ingredient.quantityFactor;
                })
            });
        }
    }
}
</script>

<style>
    .content {
        padding: 1em;
        padding-bottom: 0;
    }

    .title {
        font-size: 1em;
        color: #565d70;
    }

    .subtitle {
        font-size: 0.7em;
        color: #bcbdbd;
    }

    .partition-title {
        background-color: #565d70;
        color: #00e2a5;
        padding: 0.8em;
        text-align: center;
        margin-bottom: 0;
    }

    .partition-button {
        width: 100%;
        border: 0;
        color: #565d70;
        background-color: #00e2a5;
        text-align: center;
        padding: 0.8em;
    }

    .partition-button i {
        border: 2px solid #565d70;
        font-size: 0.7em;
        padding: 0.4em;
        margin-right: 0.5em;
        border-radius: 100%;
    }

    .meal-controls {
        display: flex;
        justify-content: space-between;
        background-color: white;
        padding: 1.25em;
    }

    .meal-controls span {
        font-size: 1em;
    }
</style>