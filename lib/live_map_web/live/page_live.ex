defmodule LiveMapWeb.PageLive do
  use LiveMapWeb, :live_view

  def mount(_params, _session, socket) do
    {
      :ok,
      socket
    }
  end
end
