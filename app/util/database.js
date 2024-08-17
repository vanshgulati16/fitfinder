import { supabase } from '../../lib/supabaseConnection';
export default async function FetchProductList(category,color,price,rating) {

    try {
        let { data, error } = await supabase
            .from('collections')
            .select('*')
            .eq('category', category)
            .eq('color',color)
            // .lt('price',price)
            // .gt('rating',rating)
            .limit(20)

        // Handle any errors.
        if (error) { throw error }

        if (data) {
            return data
        }
    } catch (error) {
        alert(error.message);
        return null
    }
}