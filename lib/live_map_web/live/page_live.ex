defmodule LiveMapWeb.PageLive do
  use LiveMapWeb, :live_view
  alias Phoenix.LiveView.JS
  def mount(_params, _session, socket) do
    {
      :ok,
      socket
      |> assign(:text, "")
      |> assign(:search_result, [])
    }
  end

  def handle_event("search", %{"keyword" => keyword}, socket) do
    {
      :noreply,
      socket
      |> assign(:text, keyword)
      |> push_event("search", %{keyword: keyword})
    }
  end

  def handle_event("search_result", %{"result" => result}, socket) do
    {
      :noreply,
      socket
      |> assign(:search_result, result)
    }
  end

  def handle_event("add_marker", location, socket) do
    {
      :noreply,
      socket
      |> push_event("add_marker", location)
    }
  end
end
