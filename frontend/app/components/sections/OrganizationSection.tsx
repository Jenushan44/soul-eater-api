"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, FunnelX, MoveRight, School, Search, } from "lucide-react";
import EndpointCard from "../EndpointCard";
import type { Organization } from "../../types/api";
import { organizationExamples } from "../../data/apiExamples";
import { organizationLeaders, organizationStatuses, organizationTypes, } from "../../data/filterOptions";

type OrganizationSectionProps = {
  organizations: Organization[];
  cardsToShow: number;
};

export default function OrganizationSection({ organizations, cardsToShow, }: OrganizationSectionProps) {
  const [organizationStartIndex, setOrganizationStartIndex] = useState(0);
  const [searchOrganization, setSearchOrganization] = useState("");
  const [selectedOrganizationType, setSelectedOrganizationType] = useState("");
  const [selectedOrganizationLeader, setSelectedOrganizationLeader] = useState("");
  const [selectedOrganizationStatus, setSelectedOrganizationStatus] = useState("");
  const [isOrganizationTypeDropdownOpen, setIsOrganizationTypeDropdownOpen,] = useState(false);
  const [isOrganizationLeaderDropdownOpen, setIsOrganizationLeaderDropdownOpen,] = useState(false);
  const [isOrganizationStatusDropdownOpen, setIsOrganizationStatusDropdownOpen,] = useState(false);

  const filteredOrganizations = organizations.filter((organization) => {
    const lowerOrganization = organization.name.toLowerCase();
    const lowerQuery = searchOrganization.toLowerCase();
    const matchesSearch = lowerOrganization.includes(lowerQuery);
    const matchesOrganizationType = selectedOrganizationType === "" || organization.organization_type.toLowerCase().includes(selectedOrganizationType.toLowerCase());

    const matchesLeader = selectedOrganizationLeader === "" || organization.leader.toLowerCase().includes(selectedOrganizationLeader.toLowerCase());

    const matchesStatus = selectedOrganizationStatus === "" || organization.status.toLowerCase().includes(selectedOrganizationStatus.toLowerCase());

    if (matchesSearch && matchesOrganizationType && matchesLeader && matchesStatus) {
      return true;
    } else {
      return false;
    }
  });

  const showNextOrganization = () => {
    const maxStartIndex = filteredOrganizations.length - cardsToShow;

    if (organizationStartIndex + cardsToShow < maxStartIndex) {
      setOrganizationStartIndex(organizationStartIndex + cardsToShow);
    } else {
      setOrganizationStartIndex(Math.max(0, maxStartIndex));
    }
  };

  const showPreviousOrganization = () => {
    if (organizationStartIndex - cardsToShow >= 0) {
      setOrganizationStartIndex(organizationStartIndex - cardsToShow);
    } else {
      setOrganizationStartIndex(0);
    }
  };

  const clearOrganizationFilters = () => {
    setSearchOrganization("");
    setSelectedOrganizationType("");
    setSelectedOrganizationLeader("");
    setSelectedOrganizationStatus("");
    setOrganizationStartIndex(0);
  };

  useEffect(() => {
    setOrganizationStartIndex(0);
  }, [searchOrganization, selectedOrganizationType, selectedOrganizationLeader, selectedOrganizationStatus]);


  return (
    <div className="scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-36 mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="organization-section">
      <div className="flex items-center justify-center gap-4 w-full">
        <div className="w-[90%] relative py-4 -my-4 px-2 -mx-2 md:flex-col 2xl:flex-row">
          <div className="relative">
            <button onClick={showPreviousOrganization} className="p-2 absolute -left-10 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%] z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2">
              <ChevronLeft className="cursor-pointer" size={40} />
            </button>

            <div className="overflow-hidden py-4 -my-4 px-2 -mx-2">
              <div className="flex">
                <div>
                  <School className="w-13 h-13 text-[#f89c0a]" />
                  <div className="w-[80%] mt-2 h-[2px] bg-zinc-700 mx-auto" />
                </div>

                <div className="ml-3 mb-5">
                  <p className="text-white text-5xl font-banner">ORGANIZATIONS</p>
                  <p className="text-zinc-400">Browse and explore all organizations from the world of SoulEater.</p>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-center gap-4 min-[1800px]:flex-nowrap">
                <div className="order-1 flex min-w-0 md:flex-1 border-zinc-800 border-2 p-1 rounded-md hover:border-[#f89c0a] w-full transition duration-300 ease-in-out min-[1800px]:flex-none min-[1800px]:w-[15%]">
                  <Search className="text-zinc-300 mr-2 ml-1 mt-[3px]" size={18} />
                  <input value={searchOrganization} onChange={(event) => setSearchOrganization(event.target.value)} className="w-full mt-[1px] outline-none border-none bg-transparent" type="text" placeholder="Search organizations..."></input>
                </div>

                <div className="order-2 min-w-0 md:flex-1 shrink-0 hover:text-white min-[1800px]:order-3 min-[1800px]:flex-none w-full min-[1800px]:w-auto">
                  <button onClick={clearOrganizationFilters} className="group text-sm flex justify-center gap-2 rounded-md p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out w-full">
                    <FunnelX className="group-hover:text-white text-[#f89c0a]" size={20} />
                    Clear Filters
                  </button>
                </div>

                <div className="order-3 grid grid-cols-1 basis-full min-w-0 items-center gap-4 md:grid-cols-2 xl:grid-cols-3 min-[1800px]:order-2 min-[1800px]:flex min-[1800px]:basis-auto min-[1800px]:flex-1 min-[1800px]:flex-nowrap">
                  <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Type:</p>

                    <button type="button" onClick={() => setIsOrganizationTypeDropdownOpen((current) => !current)} className="flex flex-1 min-w-0 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedOrganizationType || "All"}</p>
                      <ChevronRight size={18} className={`shrink-0 transition-transform ${isOrganizationTypeDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isOrganizationTypeDropdownOpen && (
                      <button type="button" onClick={() => setIsOrganizationTypeDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default"></button>
                    )}

                    {isOrganizationTypeDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 top-12 z-[100] max-h-64 w-full sm:w-[85%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedOrganizationType(""); setIsOrganizationTypeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationType === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                            All
                          </button>

                          {organizationTypes.map((type) => (
                            <button key={type} type="button" onClick={() => { setSelectedOrganizationType(type); setIsOrganizationTypeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationType === type ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Leader:</p>
                    <button type="button" onClick={() => setIsOrganizationLeaderDropdownOpen((current) => !current)} className="flex flex-1 min-w-0 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedOrganizationLeader || "All"}</p>
                      <ChevronRight size={18} className={`shrink-0 transition-transform ${isOrganizationLeaderDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isOrganizationLeaderDropdownOpen && (
                      <button type="button" onClick={() => setIsOrganizationLeaderDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default"></button>
                    )}

                    {isOrganizationLeaderDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 md:left-18 top-12 z-[100] w-full sm:w-[85%] md:w-[70%] lg:w-[80%] max-h-64 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedOrganizationLeader(""); setIsOrganizationLeaderDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationLeader === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                            All
                          </button>

                          {organizationLeaders.map((leader) => (
                            <button key={leader} type="button" onClick={() => { setSelectedOrganizationLeader(leader); setIsOrganizationLeaderDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationLeader === leader ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {leader}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Status:</p>

                    <button type="button" onClick={() => setIsOrganizationStatusDropdownOpen((current) => !current)} className="flex flex-1 min-w-0 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedOrganizationStatus || "All"}</p>
                      <ChevronRight size={18} className={`shrink-0 transition-transform ${isOrganizationStatusDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isOrganizationStatusDropdownOpen && (
                      <button type="button" onClick={() => setIsOrganizationStatusDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default"></button>
                    )}

                    {isOrganizationStatusDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 md:left-18 top-12 z-[100] w-full sm:w-[85%] md:w-[70%] lg:w-[80%] max-h-64 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedOrganizationStatus(""); setIsOrganizationStatusDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationStatus === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                            All
                          </button>

                          {organizationStatuses.map((status) => (
                            <button key={status} type="button" onClick={() => { setSelectedOrganizationStatus(status); setIsOrganizationStatusDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationStatus === status ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {filteredOrganizations.length === 0 && (
                <div className="flex items-center justify-center min-h-80 border border-zinc-800 rounded-lg">
                  <p className="text-zinc-400 text-lg">No organizations match the selected filters.</p>
                </div>
              )}

              {filteredOrganizations.length > 0 && (
                <div className="flex gap-6 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${organizationStartIndex * 324}px)`, }}>
                  {filteredOrganizations.map((organization) => (
                    <div key={organization.id} className="relative flex w-75 shrink-0 flex-col bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                      <div className="relative w-full h-60 bg-zinc-950">
                        <Image src={organization.image_url || "/organizations/organizations-placeholder.png"} alt={`${organization.name} organization`} fill className="object-cover object-top" />
                      </div>

                      <div className="absolute top-0 ml-2 mt-2 px-2 border-[#f89c0a] text-[#f8b40a] text-[19px] border-1 rounded-md bg-[#f89c0a]/10">
                        <p className="font-banner">{organization.display_type}</p>
                      </div>

                      <div className="flex flex-1 flex-col p-4 border-t border-zinc-800">
                        <h2 className="font-banner text-white text-2xl">{organization.name}</h2>
                        <p className="text-zinc-400 text-xs font-semibold">Type: {organization.display_type}</p>
                        <p className="text-zinc-400 text-xs font-semibold">Leader: {organization.leader}</p>
                        <p className="text-zinc-400 text-xs font-semibold">Location: {organization.location}</p>
                        <p className="text-zinc-400 text-xs font-semibold">Status: {organization.status}</p>
                        <a target="_blank" rel="noopener noreferrer" href={`http://127.0.0.1:8000/organizations/${organization.id}`} className="flex justify-between mt-auto pt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]">
                          VIEW PROFILE <MoveRight className="-translate-y-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={showNextOrganization} className="p-2 z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2 absolute -right-12 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%]">
              <ChevronRight className="cursor-pointer" size={40} />
            </button>
          </div>
        </div>
      </div>

      <EndpointCard
        method="GET"
        path="/organizations"
        description="Returns all organizations."
        example={organizationExamples}
      />

      <EndpointCard
        method="GET"
        path="/organizations/{organization_id}"
        description="Returns organization by id."
        parameter={{ location: "Path parameter", name: "organization_id", type: "integer", }}
        example={organizationExamples[0]}
      />

      <EndpointCard
        method="GET"
        path="/organizations?name=Death Weapon Meister Academy"
        description="Filters organizations by name."
        parameter={{ location: "Query parameter", name: "name", type: "string", }}
        example={[organizationExamples[0]]}
      />

      <EndpointCard
        method="GET"
        path="/organizations?organization_type=Educational Institution and International Defense Organization"
        description="Filters organizations by type."
        parameter={{ location: "Query parameter", name: "organization_type", type: "string", }}
        example={[organizationExamples[0]]}
      />

      <EndpointCard
        method="GET"
        path="/organizations?leader=Lord Death"
        description="Filters organizations by leader."
        parameter={{ location: "Query parameter", name: "leader", type: "string", }}
        example={[organizationExamples[0]]}
      />

      <EndpointCard
        method="GET"
        path="/organizations?location=Death City"
        description="Filters organizations by location."
        parameter={{ location: "Query parameter", name: "location", type: "string", }}
        example={[organizationExamples[0]]}
      />

      <EndpointCard
        method="GET"
        path="/organizations?status=Active"
        description="Filters organizations by status."
        parameter={{ location: "Query parameter", name: "status", type: "string", }}
        example={[organizationExamples[0]]}
      />
    </div>
  );
}