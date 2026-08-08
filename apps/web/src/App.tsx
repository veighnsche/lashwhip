import { AppLayout } from "@/components/app-layout"

export function App(): React.JSX.Element {
  return (
    <AppLayout
      sidebar={<nav aria-label="Sidebar" />}
      chatView={<section aria-label="Chat view" />}
      auxiliaryPane={<aside aria-label="Auxiliary pane" />}
    />
  )
}
