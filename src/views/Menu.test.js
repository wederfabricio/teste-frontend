import { mount } from '@vue/test-utils';
import Menu from './Menu.vue';

describe('Quantidade de refeições', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(Menu);
    })

    it('Ao inicializar, a quantidade de refeições deve ser igual a 1', () => {
        const initialText = wrapper.find('[data-test="mealText"]').text();
        expect(initialText).toBe("1 refeição");
    });

    it('Botão adicionar deve aumentar a quantidade de refeições', () => {
        wrapper.find('[data-test="plusMeal"]').trigger('click').then(() => {
            const text = wrapper.find('[data-test="mealText"]').text();
            expect(text).toBe("2 refeições");
        });        
    });
    
    it('Botão adicionar deve diminuir a quantidade de refeições', () => {
        let changedText = wrapper.find('[data-test="mealText"]').text();
        expect(changedText).toBe("2 refeições");

        wrapper.find('[data-test="minusMeal"]').trigger('click').then(() => {
            const text = wrapper.find('[data-test="mealText"]').text();
            expect(text).toBe("1 refeição");
        });        
    });
});

describe('Adicionar um ingrediente', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(Menu);
    })

    it('Ao adicionar um ingrediente, deve ser adicionado na divisória', () => {
        const ingredientExists = wrapper.find('[data-test="ingredient"]').exists();
        expect(ingredientExists).toBe(false);

        wrapper.find('[data-test="add-partition-button"]').trigger('click').then(() => {
            wrapper.find('[data-test="add-item"]').trigger('click').then(() => {
                const ingredientExists = wrapper.find('[data-test="ingredient"]').exists();
                expect(ingredientExists).toBe(true);
            });
        });
    });

    it('Ao adicionar um ingrediente, os valores nutricionais (carboidratos) devem mudar', () => {
        const carbohydrates = wrapper.find('[data-test="carbohydrates"]').text();
        expect(carbohydrates).not.toBe("0g");
    })
});