import Image from "next/image";
import { Inter } from "next/font/google";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useRouter } from "next/router";


export default function Home() {
  const navigate = useRouter();
  const fetchPokemon = async (pokeName: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
      if (!response.ok) {
        throw new Error("Pokemon Not Found!");
      }
      const data = await response.json();
      navigate.push(`/pokemon/${pokeName}`);
    } catch (error) {
      alert("Pokemon Not Exist!");
    }
  }

  const InputPokeValidation = Yup.object().shape({
    pokeName: Yup.string().required("Required").min(3, "Must be more than 3 characters"),
  });
  const formik = useFormik({
    initialValues: {
      PokeName: "",
    },
    onSubmit: (values) => {
      fetchPokemon(values.PokeName);

    },
    // validationSchema: InputPokeValidation,
  });


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Pokemon Search</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="PokeName" className="block text-gray-700">Pokemon Name:</label>
            <input
              type="text"
              id="PokeName"
              name="PokeName"
              value={formik.values.PokeName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.PokeName && formik.errors.PokeName ? (
              <div className="text-red-500 text-xs italic mt-1">{formik.errors.PokeName}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >Search Pokemon</button>
        </form >

      </div>


    </div>
  );
}
