import { Button } from "@nextui-org/react"
import { NextPage } from "next"
import {Layout} from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    <Layout title="Listado de Pokemon">

      <Button color="gradient"
      >Click me</Button>
    </Layout>
  )
}

export default HomePage
