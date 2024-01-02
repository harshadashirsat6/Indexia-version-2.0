import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFormData } from "../../store/appSlice";
import { GiPapyrus, GiReceiveMoney } from "react-icons/gi";
import { inputs } from "../../configs/inputs";
import { products } from "../../configs/products";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRedirect = (param) => {
    dispatch(setFormData({ ...inputs, category: param }));

    navigate(`/loan/${param}`);
  };

  return (
    <main className="mb-10 md:mb-20 mt-10 md:mt-0 mx-5 sm:mx-10 md:mx-20 lg:mx-32 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
      {products.map((product, i) => {
        return (
          <section
            key={i}
            onClick={() => handleRedirect(`${product.title}`)}
            className="relative w-full rounded-xl bg-gradient-to-br from-cyan-200 to-emerald-100 py-2.5 pb-10 px-3 sm:px-5 cursor-pointer shadow"
          >
            <GiPapyrus className="absolute bottom-0 right-0 text-5xl sm:text-7xl text-black/10" />
            <h5 className="font-normal text-lg sm:text-lg text-black/50 mb-0.5 capitalize">
              {product.title.replace("-", " ")}
            </h5>
            <p className="text-sm text-black/90 hidden sm:block">
              {product.description}
            </p>
          </section>
        );
      })}
    </main>
  );
};

export default Products;
